import {
  MinLength,
  MaxLength,
  Length,
  IsBoolean,
  IsOptional,
} from 'class-validator';
export class UpdateHotelDto {
  @Length(3, 25)
  @IsOptional()
  name: string;
  @Length(3, 25)
  @IsOptional()
  location: string;
  @IsBoolean()
  isPopular: boolean;
  @MinLength(3, {
    message: 'Min desc 3 word',
  })
  @MaxLength(50, {
    message: 'ops max desc is 50 words',
  })
  description: string;
  categoryId: number;
  price: number;
  @IsOptional()
  facilitiesId: number[];
}
