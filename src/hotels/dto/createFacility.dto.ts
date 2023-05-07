import { MinLength, MaxLength, IsOptional } from 'class-validator';
export class createFacilityDto {
  @MinLength(3, {
    message: 'Min desc 3 word',
  })
  name: string;
  @IsOptional()
  desc: string;
}
