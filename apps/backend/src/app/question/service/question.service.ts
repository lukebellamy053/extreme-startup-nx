import { Inject, Injectable } from '@nestjs/common';
import { QuestionFactory } from './question.factory';
import { IPlayer } from '../../player/types/IPlayer';
import axios from 'axios';
import { IQuestion } from '../types/IQuestion';

const { SCORE, PENALTY } = process.env;


const questionCorrectScore = parseInt(SCORE ?? '10');
const questionWrongScore = parseInt(SCORE ?? '10') * -1;
const serverDownPenalty = parseInt(PENALTY ?? '50') * -1;

@Injectable()
export class QuestionService {

  @Inject() factory: QuestionFactory;

  async sendQuestion(round: number, players: IPlayer[]) {
    // Send a question from each round so far
    for (let actingRound = 0; actingRound <= round; actingRound++) {
      const question = this.factory.getQuestionForRound(actingRound);
      console.log('Sending a question to players: ' + JSON.stringify({
        round,
        question,
        players: players.length
      }));
      players = await Promise.all(players.map(player => this.sendQuestionToPlayer(question, player)));
    }
    return players;
  }

  private sendQuestionToPlayer(question: IQuestion, player: IPlayer): Promise<IPlayer> {
    return axios.get(`${player.host}/api/answer`, {
      timeout: 3000,
      params: { q: question.question }
    }).then(data => data.data).then(result => {
      const correctAnswer = `${result}` === question.answer;
      console.log(JSON.stringify({ player: player.name, event: correctAnswer ? 'Correct' : 'Incorrect' }));
      player.score += correctAnswer ? questionCorrectScore : questionWrongScore;
      return player;
    }).catch(() => {
      console.log({ player: player.name, event: 'Server Down' });
      player.score += serverDownPenalty;
      return player;
    });
  }

}
