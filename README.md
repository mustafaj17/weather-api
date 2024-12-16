# Weather API

A modern weather API service built with NestJS that provides current weather and forecast data using the OpenWeatherMap API. The service includes both REST and GraphQL endpoints, with built-in caching, rate limiting, and database integration for favorite locations.

## Features

- Current weather data by coordinates or city name
- 5-day weather forecast
- GraphQL support
- In-memory caching
- Rate limiting
- PostgreSQL database integration

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- OpenWeatherMap API key

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=myapp
DB_PORT=5432
DB_HOST=localhost
WEATHER_API_KEY=your_openweathermap_api_key
JWT_SECRET=your-super-secret-key-replace-in-production
JWT_EXPIRATION=1h
```

4. Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

5. Start the application:

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## FAQ

### If you see the error `ERROR [TypeOrmModule] Unable to connect to the database.`

- change the host in the .env file to your local ip address
- to get your local ip address, run `ifconfig` or `ipconfig` in your terminal or
- check network settings in your computer

The API will be available at `http://localhost:3000`

## API Documentation

### REST Endpoints

#### Current Weather

- **GET** `/weather?lat={latitude}&lon={longitude}`

  - Get current weather by coordinates
  - Query Parameters:
    - `lat`: Latitude (required)
    - `lon`: Longitude (required)

- **GET** `/weather/{city}`
  - Get current weather by city name
  - Parameters:
    - `city`: City name (required)

#### Weather Forecast

- **GET** `/weather/forecast?lat={latitude}&lon={longitude}`

  - Get 5-day forecast by coordinates
  - Query Parameters:
    - `lat`: Latitude (required)
    - `lon`: Longitude (required)

- **GET** `/weather/forecast/{city}`
  - Get 5-day forecast by city name
  - Parameters:
    - `city`: City name (required)

### GraphQL Endpoints

Available at `/graphql`

#### Queries

```graphql
# Get current weather by city
query {
  getWeather(city: "London") {
    city
    country
    temperature
    description
    # ... other fields
  }
}

# Get forecast by city
query {
  getForecast(city: "London") {
    city
    country
    forecast {
      date
      temperature
      description
      # ... other fields
    }
  }
}
```

## License

This project is licensed under the [MIT License](LICENSE).
