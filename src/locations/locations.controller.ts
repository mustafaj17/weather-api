import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return await this.locationsService.create(createLocationDto.city);
  }

  @Get()
  async findAll(): Promise<Location[]> {
    return await this.locationsService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.locationsService.remove(id);
  }
}
