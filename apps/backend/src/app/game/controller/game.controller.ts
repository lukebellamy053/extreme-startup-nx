import { Controller, Delete, Inject, Post } from '@nestjs/common';
import { GameService } from '../service/game.service';

@Controller()
export class GameController {

  @Inject() gameService: GameService;

  @Post()
  public async startGame() {
    return this.gameService.startGame();
  }

  @Delete()
  public async stopGame() {
    return this.gameService.stopGame();
  }

}
