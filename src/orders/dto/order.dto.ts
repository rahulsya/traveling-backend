import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class createOrderDto {
  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  end_date: Date;

  @IsInt()
  @IsNotEmpty()
  hotelId: number;
}
