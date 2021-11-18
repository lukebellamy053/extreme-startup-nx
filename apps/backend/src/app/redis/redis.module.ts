import { Global, Module } from '@nestjs/common';
import { RedisService } from './service/redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService]
})
@Global()
export class RedisModule {}
