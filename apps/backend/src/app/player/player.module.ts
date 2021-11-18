import { Module } from '@nestjs/common';
import { PlayerService } from './service/player.service';

@Module({
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {
}
