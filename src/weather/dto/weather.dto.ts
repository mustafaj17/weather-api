import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lon: number;
}

export class CityDto {
  @IsString()
  @IsNotEmpty()
  city: string;
}

export interface GeocodingResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export class WeatherResponse {
  temperature: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  description: string;
  windSpeed: number;
  windDeg: number;
  windGust?: number;
  visibility: number;
  clouds: number;
  city: string;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ForecastResponse {
  city: string;
  country: string;
  forecast: {
    date: string;
    temperature: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    description: string;
    windSpeed: number;
    windDeg: number;
    windGust?: number;
    visibility: number;
    clouds: number;
  }[];
}
