import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/service/redis.service';
import { Questions } from '../../question/consts/questions';


@Injectable()
export class RoundService {

  private CURRENT_ROUND_KEY = 'current-round';

  @Inject() private redisService: RedisService;

  getRound(): Promise<number> {
    return this.loadCurrentRound();
  }

  resetRounds() {
    return this.redisService.save(this.CURRENT_ROUND_KEY, '0');
  }

  stopGame() {
    return this.redisService.save(this.CURRENT_ROUND_KEY, 'null');
  }

  async nextRound() {
    let round = await this.loadCurrentRound();
    if(round - 1 === Questions.length) {
      console.log("Max round reached")
      return;
    }
    round++;
    await this.redisService.save(this.CURRENT_ROUND_KEY, `${round}`);
  }

  private async loadCurrentRound() {
    return parseInt(await this.redisService.get(this.CURRENT_ROUND_KEY));
  }
}
