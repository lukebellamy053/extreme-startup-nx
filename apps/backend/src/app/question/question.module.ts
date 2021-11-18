import { Module } from '@nestjs/common';
import { QuestionService } from './service/question.service';
import { QuestionFactory } from './service/question.factory';

@Module({
  providers: [QuestionService, QuestionFactory],
  exports: [QuestionService]
})
export class QuestionModule {

}
