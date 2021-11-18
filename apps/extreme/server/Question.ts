import {getRandomElement, Questions} from "../consts/questions";

export class Question {

    constructor(public question: string, public answer: string) {
    }

    static questionForRound(round: number): Question {
        let questionDefinition;
        if(round > Questions.length) {
            questionDefinition = getRandomElement(Questions);
        } else {
            questionDefinition = Questions[round];
        }
        const question = questionDefinition.transformer();
        return new Question(question.question, `${question.answer}`);
    }

}
