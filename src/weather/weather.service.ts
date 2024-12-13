import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  WeatherResponse,
  ForecastResponse,
  LocationDto,
} from './dto/weather.dto';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY');
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather({ lat, lon }: LocationDto): Promise<WeatherResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
      );

      return {
        temperature: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        windSpeed: response.data.wind.speed,
        windDeg: response.data.wind.deg,
        windGust: response.data.wind.gust,
        visibility: response.data.visibility,
        clouds: response.data.clouds.all,
        city: response.data.name,
        country: response.data.sys.country,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Weather service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getForecast({ lat, lon }: LocationDto): Promise<ForecastResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
      );

      const forecast = response.data.list.map((item) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        feels_like: item.main.feels_like,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        windSpeed: item.wind.speed,
        windDeg: item.wind.deg,
        windGust: item.wind.gust,
        visibility: item.visibility,
        clouds: item.clouds.all,
      }));

      return {
        city: response.data.city.name,
        country: response.data.city.country,
        forecast: forecast,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Weather service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
