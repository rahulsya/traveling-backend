import { MinLength, MaxLength, Length, IsBoolean, } from 'class-validator';
export class CreateHotelDto {
  @Length(3, 25)
  name: string;
  @Length(3, 25)
  location: string;
  @IsBoolean()
  isPopular: boolean;
  @MinLength(3, {
    message: 'Min desc 3 word',
  })
  @MaxLength(50, {
    message: 'ops max desc is 50 words',
  })
  categoryId:number
  description: string;
  price: number;
}
