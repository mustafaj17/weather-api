# Weather API Documentation

## Caching Strategy

The application implements a sophisticated multi-level caching strategy using `@nestjs/cache-manager` to optimize performance and reduce external API calls. The caching implementation follows these key principles:

### 1. Geocoding Cache

- **Duration**: 1 hour
- **Key Format**: `geo_{city}`
- **Rationale**: City coordinates rarely change, so a longer cache duration is appropriate
- **Benefits**: Reduces redundant geocoding API calls for frequently searched cities

### 2. Current Weather Cache

- **Duration**: 10 minutes
- **Key Format**: `weather_{lat}_{lon}`
- **Rationale**: Weather conditions change frequently, so a shorter cache duration ensures data freshness
- **Benefits**: Balances data accuracy with API usage optimization

### 3. Forecast Cache

- **Duration**: 30 minutes
- **Key Format**: `forecast_{lat}_{lon}`
- **Rationale**: Forecast data updates less frequently than current weather
- **Benefits**: Longer cache duration reduces API calls while maintaining acceptable forecast accuracy

### Cache Configuration

- Global cache configuration with a default TTL of 10 minutes
- Maximum cache size of 100 items to prevent memory overflow
- In-memory caching for fast access and simple implementation

## Design Decisions and Assumptions

### 1. Architecture Patterns

- **Clean Architecture**: Separation of concerns with distinct layers (controllers, services, entities)
- **Repository Pattern**: Abstraction of data persistence with TypeORM
- **Dependency Injection**: NestJS's built-in DI container for loose coupling
- **SOLID Principles**: Each component has a single responsibility and depends on abstractions

### 2. API Design

- **Dual Interface**: Both REST and GraphQL endpoints for maximum flexibility
- **Rate Limiting**: 10 requests per minute to prevent abuse
- **Input Validation**: DTO-based validation using class-validator
- **Error Handling**: Centralized exception filter for consistent error responses

### 3. Data Management

- **PostgreSQL**: Chosen for reliability and geospatial capabilities
- **TypeORM**: Used for database operations with type safety
- **Entity Design**: Simple but extensible location entity design

### 4. Security Considerations

- **Environment Variables**: Sensitive data stored in .env file
- **API Key Protection**: OpenWeatherMap API key secured in environment variables
- **Input Sanitization**: All inputs validated and sanitized before processing

### 5. Assumptions

- **Cache Invalidation**: No manual cache invalidation required for weather data
- **Data Freshness**: 10-minute weather cache is acceptable for most use cases
- **API Reliability**: OpenWeatherMap API is assumed to be generally available
- **Location Data**: City names are assumed to be in English
- **Time Zones**: All timestamps are in UTC for consistency
