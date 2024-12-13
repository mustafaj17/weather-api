import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LocationDto } from './dto/weather.dto';

describe('WeatherController', () => {
  let controller: WeatherController;
  let service: WeatherService;

  const mockLocation: LocationDto = {
    lat: 44.34,
    lon: 10.99,
  };

  const mockWeatherService = {
    getCurrentWeather: jest.fn(),
    getForecast: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: mockWeatherService,
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrentWeather', () => {
    it('should return weather data for valid coordinates', async () => {
      const mockWeatherData = {
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
      };

      mockWeatherService.getCurrentWeather.mockResolvedValueOnce(
        mockWeatherData,
      );

      const result = await controller.getCurrentWeather(mockLocation);
      expect(result).toEqual(mockWeatherData);
      expect(service.getCurrentWeather).toHaveBeenCalledWith(mockLocation);
    });

    it('should throw HttpException when location is not found', async () => {
      mockWeatherService.getCurrentWeather.mockRejectedValueOnce(
        new HttpException('Location not found', HttpStatus.NOT_FOUND),
      );

      await expect(controller.getCurrentWeather(mockLocation)).rejects.toThrow(
        HttpException,
      );
      expect(service.getCurrentWeather).toHaveBeenCalledWith(mockLocation);
    });
  });

  describe('getForecast', () => {
    it('should return forecast data for valid coordinates', async () => {
      const mockForecastData = {
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
      };

      mockWeatherService.getForecast.mockResolvedValueOnce(mockForecastData);

      const result = await controller.getForecast(mockLocation);
      expect(result).toEqual(mockForecastData);
      expect(service.getForecast).toHaveBeenCalledWith(mockLocation);
    });

    it('should throw HttpException when location is not found', async () => {
      mockWeatherService.getForecast.mockRejectedValueOnce(
        new HttpException('Location not found', HttpStatus.NOT_FOUND),
      );

      await expect(controller.getForecast(mockLocation)).rejects.toThrow(
        HttpException,
      );
      expect(service.getForecast).toHaveBeenCalledWith(mockLocation);
    });
  });
});
