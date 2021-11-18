import {createClient} from 'redis';

export const RedisClient = createClient(process.env.REDIS_HOST as string);

RedisClient.on('error', (err) => console.log('Redis Client Error', err));

export const RedisGet = (key: string) => new Promise<string | null>((resolve, reject) => {
    RedisClient.get(key, (err, data) => {
        err ? reject(err) : resolve(data);
    })
});

export const RedisGetJSON = (key: string) => RedisGet(key).then(data => data ? JSON.parse(data) : null);

export const RedisSave = (key: string, value: string) => new Promise<string | null>((resolve, reject) => {
    RedisClient.set(key, value, (err, data) => {
        err ? reject(err) : resolve(data);
    })
});

export const RedisCommand = (command: string) => new Promise((resolve, reject) => {
    const cmd = command.split(" ").slice(0, 1)[0];
    const args = command.split(" ").slice(1);
    RedisClient.sendCommand(cmd, args, (error, data) => error != null ? reject(error) : resolve(data));
})

export const RedisSaveJSON = (key: string, value: any) => RedisSave(key, JSON.stringify(value));
