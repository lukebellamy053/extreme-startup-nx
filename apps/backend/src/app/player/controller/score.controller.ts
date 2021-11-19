import { Controller, Get, Inject } from '@nestjs/common';
import { PlayerService } from '../service/player.service';

@Controller('/score')
export class ScoreController {

  @Inject() playerService: PlayerService;

  @Get()
  public async getScores() {
    return this.playerService.getScores();
  }

}
