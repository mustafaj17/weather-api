import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';
import {
  LocationDto,
  WeatherResponse,
  ForecastResponse,
} from './dto/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getCurrentWeather(
    @Query(new ValidationPipe({ transform: true })) location: LocationDto,
  ): Promise<WeatherResponse> {
    return this.weatherService.getCurrentWeather(location);
  }

  @Get('forecast')
  async getForecast(
    @Query(new ValidationPipe({ transform: true })) location: LocationDto,
  ): Promise<ForecastResponse> {
    return this.weatherService.getForecast(location);
  }
}
