import {Job} from "bull";
import {Question} from "../../server/Question";
import {getPlayers} from "../../server/Player";
import axios from "axios";
const Queue = require('bull');
import {RedisGet, RedisGetJSON, RedisSave, RedisSaveJSON} from "./redis";

const {REDIS_HOST, ROUND_LENGTH, QUESTION_FREQUENCY, SCORE, PENALTY} = process.env;

if (!(ROUND_LENGTH && QUESTION_FREQUENCY)) {
    throw new Error('ROUND_LENGTH and QUESTION_FREQUENCY are required');
}

const roundLength = parseInt(ROUND_LENGTH) * 1000;
const questionFrequency = parseInt(QUESTION_FREQUENCY) * 1000;
const questionCorrectScore = parseInt(SCORE ?? "10");
const questionWrongScore = parseInt(SCORE ?? "10") * -1;
const serverDownPenalty = parseInt(PENALTY ?? "50") * -1;

export const StartGameQueue = async () => {
    await clearQueue().catch(err => console.error(err));
    await RedisSaveJSON("players:scores", []);
    await RedisSave("current-round", `0`);

    const GameQueue = new Queue("send-question", process.env.REDIS_HOST);

    await GameQueue.add('send-question-task', {}, {repeat: {every: questionFrequency}}).then(() => console.log("Send question task added")).catch(err => console.error())
    await GameQueue.add('update-round-task', {}, {repeat: {every: roundLength}}).then(() => console.log("Update round task added")).catch(err => console.error())
    GameQueue.process('send-question-task', (job: Job) => SendQuestion()).catch((e) => console.log(`Something went wrong: ${e}`));
    GameQueue.process('update-round-task', (job: Job) => UpdateRound()).catch((e) => console.log(`Something went wrong: ${e}`));
    console.log("Setting new round");
}

export const PauseGame = async () => {
    await clearQueue().catch(err => console.error(err));
    await clearRedis();
}

const clearQueue = () => {
    const GameQueue = new Queue("send-question", REDIS_HOST);
    return GameQueue.obliterate({force: true})
}

const clearRedis = async () => {
    await RedisSave("current-round", `null`);
    await RedisSaveJSON("players", {});
    await RedisSaveJSON("players:scores", []);
}

const UpdateRound = async () => {
    console.log("Updating the current round");
    const currentRound = await RedisGet("current-round").then(x => parseInt(x ?? '0'));
    const newRound = currentRound + 1;
    await RedisSave("current-round", `${newRound}`)
}

const SendQuestion = async () => {
    const currentRound = await RedisGet("current-round").then(x => parseInt(x ?? '0'));
    const players = await getPlayers();
    let playerState;
    for (let i = 0; i <= currentRound; i++) {
        const question = Question.questionForRound(i);
        console.log("Sending a question to players: " + JSON.stringify({
            currentRound,
            question,
            players: players.length
        }));
        const updatedPlayers = await Promise.all(players.map(player => axios.get(`${player.host}/api/answer`, {
            timeout: 3000,
            params: {q: question.question}
        }).then(data => data.data).then(result => {
            const correctAnswer = `${result}` === question.answer;
            console.log(JSON.stringify({player: player.name, event: correctAnswer ? 'Correct' : 'Incorrect'}))
            player.score += correctAnswer ? questionCorrectScore : questionWrongScore;
            return player;
        }).catch(() => {
            console.log({player: player.name, event: "Server Down"})
            player.score += serverDownPenalty;
            return player;
        })));
        playerState = updatedPlayers.reduce((players, player) => {
            players[player.name] = player;
            return players;
        }, {});
        await RedisSaveJSON("players", playerState);
    }

    await RedisGetJSON("players:scores").then((score) => {
        const newScore = score ?? [];
        newScore.push({
            date: Date.now(),
            players: playerState
        });
        RedisSaveJSON("players:scores", newScore).catch(err => console.error(err));
    })
}
