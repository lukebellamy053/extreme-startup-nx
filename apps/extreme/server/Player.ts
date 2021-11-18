import {RedisClient, RedisCommand, RedisGet, RedisGetJSON, RedisSaveJSON} from "../pages/api/redis";

export interface Player {
    name: string;
    host: string;
}

let _players: { [x: string]: Player } = {};

export const getScores = () => RedisGetJSON("players:scores");

export const getPlayers = () => RedisGetJSON("players").then(players => {
    _players = players ?? {};
    return Object.values(_players)
});

export const newPlayer = async (player: Player) => {
    _players[player.name] = new Player(player.host, player.name);
    await savePlayers();
    return _players[player.name];
}
export const removePlayer = async (name: string) => {
    delete _players[name];
    await savePlayers();
}

export const getRound = () => RedisGet("current-round").then(x => x != "null" && x != null ? parseInt(x) : null);

const savePlayers = async () => {
    await RedisSaveJSON("players", _players)
}

export class Player {

    constructor(public host: string, public name: string, public score: number = 0) {
    }

}
