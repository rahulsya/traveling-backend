import { IsDateString, IsNotEmpty } from 'class-validator';

export class createOrderDto {
  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  end_date: Date;

  @IsNotEmpty()
  hotelId: number;

  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  phone_number: string;
  @IsNotEmpty()
  bank_name: string;
  @IsNotEmpty()
  sender_name: string;
}
