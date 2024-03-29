import { createClient } from 'redis';
import { IPlayer } from './types/IPlayer';

export const RedisClient = createClient(process.env.REDIS_HOST as string);

RedisClient.on('error', (err) => console.log('Redis Client Error', err));

export const RedisGet = (key: string) => new Promise<string | null>((resolve, reject) => {
  RedisClient.get(key, (err, data) => {
    err ? reject(err) : resolve(data);
  });
});

export const RedisGetJSON = (key: string) => RedisGet(key).then(data => data ? JSON.parse(data) : null);

export const RedisSave = (key: string, value: string) => new Promise<string | null>((resolve, reject) => {
  RedisClient.set(key, value, (err, data) => {
    err ? reject(err) : resolve(data);
  });
});

export const RedisSaveJSON = (key: string, value: any) => RedisSave(key, JSON.stringify(value));

export const getPlayers = () => RedisGetJSON('players').then(data => data ?? {});

export const getPlayersArray = () => RedisGetJSON('players').then(players => {
  return Object.values(players ?? {}) as IPlayer[];
});

export const newPlayer = async (player: IPlayer) => {
  const players = await getPlayers();
  players[player.name] = { host: player.host, name: player.name, score: 0, history: [] };
  await RedisSaveJSON('players', players);
  return players[player.name];
};

export const removePlayer = async (name: string) => {
  console.log("Removing player", name)
  const players = await getPlayers();
  console.log(players)
  delete players[name];
  console.log(players)
  await RedisSaveJSON('players', players);
};
