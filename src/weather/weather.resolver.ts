import { Args, Query, Resolver } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { Weather, Forecast } from './models/weather.model';

@Resolver(() => Weather)
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => Weather)
  async getWeather(@Args('city') city: string): Promise<Weather> {
    return this.weatherService.getCurrentWeatherByCity({ city });
  }

  @Query(() => Forecast)
  async getForecast(@Args('city') city: string): Promise<Forecast> {
    return this.weatherService.getForecastByCity({ city });
  }
}
