import { Module } from '@nestjs/common';
import { GameService } from './service/game.service';
import { QuestionModule } from '../question/question.module';
import { PlayerModule } from '../player/player.module';
import { RoundService } from './service/round.service';
import { GameController } from './controller/game.controller';

@Module({
  imports: [QuestionModule, PlayerModule],
  controllers: [GameController],
  providers: [GameService, RoundService]
})
export class GameModule {
}
