import { Controller, Post, Request, Put, Param, Delete } from '@nestjs/common';
import { createFacilityDto } from 'src/hotels/dto/createFacility.dto';
import { FacilityService } from 'src/hotels/services/facility/facility.service';

@Controller('facility')
export class FacilityController {
  constructor(private facilityService: FacilityService) {}

  @Post()
  async create(@Request() req) {
    const data: createFacilityDto = req.body;
    return this.facilityService.createFacility(data);
  }

  @Put('/:id')
  async update(@Param() params, @Request() req) {
    const data = req.body;
    return this.facilityService.updateFaclity(params?.id, data);
  }

  @Delete('/:id')
  async delete(@Param() params) {
    return this.facilityService.deleteFacility(params?.id);
  }
}
