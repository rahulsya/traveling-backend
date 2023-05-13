import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/utils/entity/images.entity';
import { Hotels } from 'src/utils/entity/hotels.entity';
import { Repository } from 'typeorm';
import { unlinkSync } from 'fs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images) private imageRespository: Repository<Images>,
    @InjectRepository(Hotels) private hotelRepository: Repository<Hotels>,
  ) {}

  async storeImage(hotelid: number, fileName: string) {
    const findHotel = await this.hotelRepository.findOne({
      where: { id: hotelid },
    });
    if (!findHotel) {
      throw new HttpException('Data hotel not found', HttpStatus.NOT_FOUND);
    }
    const newImage = await this.imageRespository.create({
      image_url: fileName,
      hotel: { id: hotelid },
    });
    return this.imageRespository.save(newImage);
  }

  async deleteImage(id) {
    const findImage = await this.imageRespository.findOne({
      where: { id },
    });
    const imageName = findImage.image_url.split('/')[1];
    unlinkSync(`uploads/${imageName}`);

    await this.imageRespository.remove(findImage);

    return {
      message: 'success delete image hotel',
    };
  }
}
