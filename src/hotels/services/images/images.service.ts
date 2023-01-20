import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/utils/entity/images.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images) private imageRespository: Repository<Images>,
  ) {}

  async storeImage(hotelid: number, fileName: string) {
    const newImage = await this.imageRespository.create({
      image_url: fileName,
      hotel: { id: hotelid },
    });
    return this.imageRespository.save(newImage);
  }
}
