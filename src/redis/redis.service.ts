import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async get(key: string) {
     return await this.cacheManager.get(key);
  }
  public async set(key: string, value: object) {
   await this.cacheManager.set(key, value);
  }
  public async del(key: any) {
   await this.cacheManager.del(key);
  }
}