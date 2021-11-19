import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { PlayerService } from '../service/player.service';
import { IPlayer } from '@extreme-startup/common';

@Controller('/player')
export class PlayerController {

  @Inject() playerService: PlayerService;

  @Get()
  public async getPlayers() {
    return this.playerService.getPlayers();
  }

  @Post()
  public async addPlayer(@Body() player: IPlayer) {
    await this.playerService.addPlayer(player);
  }

  @Delete('/:name')
  public async removePlayer(@Param('name') name: string) {
    await this.playerService.removePlayer(name);
  }

}
