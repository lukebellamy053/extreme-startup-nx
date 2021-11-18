import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [GameModule, RedisModule]
})
export class AppModule {
}
