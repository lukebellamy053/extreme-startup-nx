import { Inject, Injectable, Logger } from '@nestjs/common';
import { QuestionFactory } from './question.factory';
import axios, { AxiosResponse } from 'axios';
import { IQuestion } from '../types/IQuestion';
import { IPlayer } from '@extreme-startup/common';
import { getRandomInt } from '../consts/questions';

const { SCORE, PENALTY } = process.env;


const questionCorrectScore = parseInt(SCORE ?? '10');
const questionWrongScore = parseInt(SCORE ?? '10') * -1;
const serverDownPenalty = parseInt(PENALTY ?? '50') * -1;

@Injectable()
export class QuestionService {

  @Inject() factory: QuestionFactory;
  private log = new Logger(QuestionService.name);

  async sendQuestion(round: number, players: IPlayer[]) {
    const actingRound = getRandomInt(round);
    if (round > 0) {
      players = await this.sendQuestionToPlayers(actingRound, players);
    }
    return await this.sendQuestionToPlayers(round, players);
  }

  private async sendQuestionToPlayers(round: number, players: IPlayer[]) {
    // Send a question from each round so far
    const question = this.factory.getQuestionForRound(round);
    console.log('Sending a question to players: ' + JSON.stringify({
      round,
      question,
      players: players.length
    }));
    players = await Promise.all(players.map(player => this.sendQuestionToPlayer(question, player)));
    return players;
  }

  private sendQuestionToPlayer(question: IQuestion, player: IPlayer): Promise<IPlayer> {
    return axios.get(`${player.host}/api/answer`, {
      timeout: 3000,
      params: { q: question.question }
    }).then((data: AxiosResponse<string>) => data.data).then(result => {
      const correctAnswer = `${result}` === question.answer;
      console.log(JSON.stringify({ player: player.name, event: correctAnswer ? 'Correct' : 'Incorrect' }));
      const reward = correctAnswer ? questionCorrectScore : questionWrongScore;
      player.score += reward;
      if (!player.history) {
        player.history = [];
      }
      player.history.push({ ...question, received: result, awarded: reward });
      player.history = player.history.splice(-20);

      return player;
    }).catch(() => {
      console.log({ player: player.name, event: 'Server Down' });
      player.score += serverDownPenalty;
      if (!player.history) {
        player.history = [];
      }
      player.history.push({ ...question, received: '--Server Down--', awarded: serverDownPenalty });
      player.history = player.history.splice(-20);

      return player;
    });
  }

}
