import { Injectable, Scope } from '@nestjs/common';
import { createClient, RedisClient } from 'redis';

@Injectable()
export class RedisService {

  private redisClient: RedisClient;

  constructor() {
    this.redisClient = createClient(process.env.REDIS_HOST as string);
    this.redisClient.on('error', (err) => console.log('Redis Client Error', err));
  }

  get(key: string): Promise<string> {
    return new Promise<string | null>((resolve, reject) => {
      this.redisClient.get(key, (err, data) => {
        err ? reject(err) : resolve(data);
      })
    });
  }

  getJSON(key: string): Promise<Record<string, any>> {
    return this.get(key).then(data => JSON.parse(data));
  }

  save(key: string, value: string): Promise<string> {
    return new Promise<string | null>((resolve, reject) => {
      this.redisClient.set(key, value, (err, data) => {
        err ? reject(err) : resolve(data);
      })
    });
  }

  saveJSON(key: string, value: Record<string, any>) {
    return this.save(key, JSON.stringify(value));
  }

}
