import { createClient } from 'redis';

export const RedisClient = createClient(process.env.REDIS_HOST as string);

RedisClient.on('error', (err) => console.log('Redis Client Error', err));

const RedisGet = (key: string) => new Promise<string | null>((resolve, reject) => {
  RedisClient.get(key, (err, data) => {
    err ? reject(err) : resolve(data);
  });
});

const RedisGetJSON = (key: string) => RedisGet(key).then(data => data ? JSON.parse(data) : null);


export const getScores = () => RedisGetJSON('players:scores');

export const getPlayers = () => RedisGetJSON('players').then(players => {
  return Object.values(players ?? {});
});

export const getRound = () => RedisGet("current-round").then(x => x != "null" && x != null ? parseInt(x) : null);
