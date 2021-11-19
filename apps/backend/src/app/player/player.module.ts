import { Module } from '@nestjs/common';
import { PlayerService } from './service/player.service';
import { PlayerController } from './controller/player.controller';
import { ScoreController } from './controller/score.controller';

@Module({
  controllers: [PlayerController, ScoreController],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {
}
