import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { WeatherService } from './weather.service';
import {
  LocationDto,
  WeatherResponse,
  ForecastResponse,
  CityDto,
} from './dto/weather.dto';

@Controller('weather')
@UseGuards(ThrottlerGuard)
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

  @Get(':city')
  async getCurrentWeatherByCity(
    @Param(new ValidationPipe({ transform: true })) params: CityDto,
  ): Promise<WeatherResponse> {
    return this.weatherService.getCurrentWeatherByCity(params);
  }

  @Get('forecast/:city')
  async getForecastByCity(
    @Param(new ValidationPipe({ transform: true })) params: CityDto,
  ): Promise<ForecastResponse> {
    return this.weatherService.getForecastByCity(params);
  }
}
