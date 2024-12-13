import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherResolver } from './weather.resolver';

@Module({
  imports: [ConfigModule],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherResolver],
})
export class WeatherModule {}
