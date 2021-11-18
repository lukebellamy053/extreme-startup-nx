import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../redis/service/redis.service';
import { QuestionService } from '../../question/service/question.service';
import { RoundService } from './round.service';
import { PlayerService } from '../../player/service/player.service';

const Queue = require('bull');

const { REDIS_HOST, ROUND_LENGTH, QUESTION_FREQUENCY } = process.env;

if (!(ROUND_LENGTH && QUESTION_FREQUENCY)) {
  throw new Error('ROUND_LENGTH and QUESTION_FREQUENCY are required');
}

const roundLength = parseInt(ROUND_LENGTH) * 1000;
const questionFrequency = parseInt(QUESTION_FREQUENCY) * 1000;


@Injectable()
export class GameService {

  @Inject() private redisService: RedisService;
  @Inject() private questionService: QuestionService;
  @Inject() private roundService: RoundService;
  @Inject() private playerService: PlayerService;
  private readonly log: Logger = new Logger(GameService.name);

  constructor() {
    this.log.log("Registering job listeners")
    const GameQueue = new Queue('send-question', REDIS_HOST);
    GameQueue.process('send-question-task', () => this.triggerQuestion()).catch((e) => console.log(`Something went wrong: ${e}`));
    GameQueue.process('update-round-task', () => this.roundService.nextRound()).catch((e) => console.log(`Something went wrong: ${e}`));
  }

  async startGame() {
    this.log.log("Starting game");
    await this.roundService.resetRounds();
    await this.playerService.resetScores();

    const GameQueue = new Queue('send-question', REDIS_HOST);
    await GameQueue.add('send-question-task', {}, { repeat: { every: questionFrequency } }).then(() => console.log('Send question task added')).catch(err => console.error(err));
    await GameQueue.add('update-round-task', {}, { repeat: { every: roundLength } }).then(() => console.log('Update round task added')).catch(err => console.error(err));
    GameQueue.process('send-question-task', () => this.triggerQuestion()).catch((e) => console.log(`Something went wrong: ${e}`));
    GameQueue.process('update-round-task', () => this.roundService.nextRound()).catch((e) => console.log(`Something went wrong: ${e}`));
  }

  async stopGame() {
    this.log.log("Stopping game");

    const GameQueue = new Queue('send-question', REDIS_HOST);
    await GameQueue.obliterate({ force: true });
    await this.roundService.stopGame();
    await this.playerService.stopGame();
  }

  private async triggerQuestion() {
    this.log.log("Starting process to send a question");

    const round = await this.roundService.getRound();
    const players = await this.playerService.getPlayers().then(data => Object.values(data));
    const updatedPlayers = await this.questionService.sendQuestion(round, players);
    await this.playerService.updatePlayers(updatedPlayers);
  }

}
