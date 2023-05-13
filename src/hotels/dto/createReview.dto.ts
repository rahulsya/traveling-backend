import { Length } from 'class-validator';
export class CreateReviewDto {
  @Length(1, 2)
  rating: number;
  @Length(5)
  review: string;
  hotelId: number;
  userId: number;
  email: string;
  name: string;
}
