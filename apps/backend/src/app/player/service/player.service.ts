import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../redis/service/redis.service';
import { IPlayer, PlayerMap } from '../types/IPlayer';

@Injectable()
export class PlayerService {

  private PLAYERS_SCORES_KEY = 'players:scores';
  private PLAYERS_KEY = 'players';
  @Inject() private redisService: RedisService;
  private readonly log: Logger = new Logger(PlayerService.name);

  resetScores() {
    return this.removePlayerScores();
  }

  async stopGame() {
    await Promise.all([this.removePlayerScores(), this.removePlayers()]);
  }

  async updatePlayers(players: IPlayer[]) {
    this.log.debug('Updating players')
    const newPlayerMap = players.reduce((playerMap, player) => {
      playerMap[player.name] = player;
      return playerMap;
    }, {});
    await this.savePlayers(newPlayerMap);
    await this.recordCurrentScores(newPlayerMap);
  }

  async getPlayers(): Promise<PlayerMap> {
    return this.redisService.getJSON(this.PLAYERS_KEY);
  }

  private async recordCurrentScores(players: PlayerMap) {
    const score = await this.redisService.getJSON(this.PLAYERS_SCORES_KEY);
    const newScore = score ?? [];
    newScore.push({
      date: Date.now(),
      players
    });
    await this.redisService.saveJSON(this.PLAYERS_SCORES_KEY, newScore);
  }

  private removePlayerScores() {
    return this.redisService.saveJSON(this.PLAYERS_SCORES_KEY, []);
  }

  private removePlayers() {
    return this.redisService.saveJSON(this.PLAYERS_KEY, {});
  }

  private savePlayers(newPlayerMap: Record<string, IPlayer>) {
    return this.redisService.saveJSON(this.PLAYERS_KEY, newPlayerMap);
  }
}
