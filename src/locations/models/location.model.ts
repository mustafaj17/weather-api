import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => ID)
  id: string;

  @Field()
  city: string;

  @Field()
  createdAt: Date;
}
