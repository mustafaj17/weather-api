import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import { Location } from './models/location.model';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Query(() => [Location])
  async getFavoriteLocations(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  @Mutation(() => Location)
  async addFavoriteLocation(@Args('city') city: string): Promise<Location> {
    return this.locationsService.create(city);
  }

  @Mutation(() => Boolean)
  async removeFavoriteLocation(@Args('id') id: string): Promise<boolean> {
    await this.locationsService.remove(id);
    return true;
  }
}
