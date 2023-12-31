import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { CacheModule,CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { RedisCacheService } from './redis.service';


@Module({
    imports: [
      CacheModule.registerAsync({
            useFactory: () => {
                return {
                    store: redisStore,
                    host: 'localhost',
                    port: 6379,
                    ttl: 60 * 3600 * 1000,
                };
            },
        }),
    ],
    providers:[RedisCacheService],
    exports: [
        RedisCacheModule,
        RedisCacheService,
    ],
  })

  export class RedisCacheModule implements OnModuleInit {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache
    ) {}
    public onModuleInit(): any {
        const logger = new Logger('Cache');
    }
  }