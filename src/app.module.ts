import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { WeatherModule } from './weather/weather.module';
import { LocationsModule } from './locations/locations.module';
import { GraphQLAppModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    WeatherModule,
    LocationsModule,
    GraphQLAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
