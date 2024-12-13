import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(city: string): Promise<Location> {
    const location = this.locationRepository.create({ city });
    return await this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  async remove(id: string): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID "${id}" not found`);
    }
  }
}
