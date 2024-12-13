import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { WeatherModule } from './weather/weather.module';
import { LocationsModule } from './locations/locations.module';
import { GraphQLAppModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 600, // 10 minutes
      max: 100, // maximum number of items in cache
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 10, // 10 requests per minute
      },
    ]),
    DatabaseModule,
    WeatherModule,
    LocationsModule,
    GraphQLAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
