import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { WeatherService } from './weather.service';
import { LocationDto } from './dto/weather.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {
  let service: WeatherService;
  let configService: ConfigService;

  const mockLocation: LocationDto = {
    lat: 44.34,
    lon: 10.99,
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mock-api-key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrentWeather', () => {
    it('should return weather data for valid coordinates', async () => {
      const mockWeatherData = {
        data: {
          main: {
            temp: 20,
            feels_like: 18,
            temp_min: 17,
            temp_max: 22,
            pressure: 1015,
            humidity: 65,
          },
          weather: [{ description: 'clear sky' }],
          wind: {
            speed: 5,
            deg: 180,
            gust: 7,
          },
          visibility: 10000,
          clouds: { all: 20 },
          name: 'Test City',
          sys: {
            country: 'IT',
            sunrise: 1632124800,
            sunset: 1632169200,
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockWeatherData);

      const result = await service.getCurrentWeather(mockLocation);

      expect(result).toEqual({
        temperature: 20,
        feels_like: 18,
        temp_min: 17,
        temp_max: 22,
        pressure: 1015,
        humidity: 65,
        description: 'clear sky',
        windSpeed: 5,
        windDeg: 180,
        windGust: 7,
        visibility: 10000,
        clouds: 20,
        city: 'Test City',
        country: 'IT',
        sunrise: 1632124800,
        sunset: 1632169200,
      });
    });

    it('should throw HttpException when location is not found', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: { status: 404 },
      });

      await expect(service.getCurrentWeather(mockLocation)).rejects.toThrow(
        new HttpException('Location not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('getForecast', () => {
    it('should return forecast data for valid coordinates', async () => {
      const mockForecastData = {
        data: {
          list: [
            {
              dt_txt: '2023-12-13',
              main: {
                temp: 20,
                feels_like: 18,
                temp_min: 17,
                temp_max: 22,
                pressure: 1015,
                humidity: 65,
              },
              weather: [{ description: 'clear sky' }],
              wind: {
                speed: 5,
                deg: 180,
                gust: 7,
              },
              visibility: 10000,
              clouds: { all: 20 },
            },
          ],
          city: {
            name: 'Test City',
            country: 'IT',
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockForecastData);

      const result = await service.getForecast(mockLocation);

      expect(result).toEqual({
        city: 'Test City',
        country: 'IT',
        forecast: [
          {
            date: '2023-12-13',
            temperature: 20,
            feels_like: 18,
            temp_min: 17,
            temp_max: 22,
            pressure: 1015,
            humidity: 65,
            description: 'clear sky',
            windSpeed: 5,
            windDeg: 180,
            windGust: 7,
            visibility: 10000,
            clouds: 20,
          },
        ],
      });
    });

    it('should throw HttpException when location is not found', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: { status: 404 },
      });

      await expect(service.getForecast(mockLocation)).rejects.toThrow(
        new HttpException('Location not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
