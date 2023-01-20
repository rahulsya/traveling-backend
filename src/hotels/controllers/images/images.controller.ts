import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Public } from 'src/auth/guard.decorator';
import { ImagesService } from 'src/hotels/services/images/images.service';
import { formatFileName, multerOptions } from 'src/utils/helpers';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Public()
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@Body() data, @UploadedFile() file: Express.Multer.File) {
    return await this.imageService.storeImage(
      data.hotelId,
      `${process.env.PUBLIC_ASSET_URL}/${formatFileName(file)}`,
    );
  }
}
