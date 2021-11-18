import { Injectable } from '@nestjs/common';
import { getRandomElement, Questions } from '../consts/questions';
import { IQuestion } from '../types/IQuestion';

@Injectable()
export class QuestionFactory {

  getQuestionForRound(round: number): IQuestion {
    let questionDefinition;
    if (round > Questions.length) {
      questionDefinition = getRandomElement(Questions);
    } else {
      questionDefinition = Questions[round];
    }
    const question = questionDefinition.transformer();
    return { question: question.question, answer: `${question.answer}` };
  }

}
