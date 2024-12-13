import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  city: string;
}
