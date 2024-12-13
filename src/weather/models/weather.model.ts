import { Field, ObjectType, Float, Int } from '@nestjs/graphql';
import { WeatherResponse, ForecastResponse } from '../dto/weather.dto';

@ObjectType()
export class Weather implements Omit<WeatherResponse, keyof any> {
  @Field()
  city: string;

  @Field()
  country: string;

  @Field(() => Float)
  temperature: number;

  @Field(() => Float)
  feels_like: number;

  @Field(() => Float)
  temp_min: number;

  @Field(() => Float)
  temp_max: number;

  @Field(() => Int)
  pressure: number;

  @Field(() => Float)
  humidity: number;

  @Field()
  description: string;

  @Field(() => Float)
  windSpeed: number;

  @Field(() => Float)
  windDeg: number;

  @Field(() => Float, { nullable: true })
  windGust?: number;

  @Field(() => Int)
  visibility: number;

  @Field(() => Int)
  clouds: number;

  @Field(() => Int)
  sunrise: number;

  @Field(() => Int)
  sunset: number;
}

@ObjectType()
export class ForecastItem {
  @Field()
  date: string;

  @Field(() => Float)
  temperature: number;

  @Field(() => Float)
  feels_like: number;

  @Field(() => Float)
  temp_min: number;

  @Field(() => Float)
  temp_max: number;

  @Field(() => Int)
  pressure: number;

  @Field(() => Float)
  humidity: number;

  @Field()
  description: string;

  @Field(() => Float)
  windSpeed: number;

  @Field(() => Float)
  windDeg: number;

  @Field(() => Float, { nullable: true })
  windGust?: number;

  @Field(() => Int)
  visibility: number;

  @Field(() => Int)
  clouds: number;
}

@ObjectType()
export class Forecast implements Omit<ForecastResponse, keyof any> {
  @Field()
  city: string;

  @Field()
  country: string;

  @Field(() => [ForecastItem])
  forecast: ForecastItem[];
}
