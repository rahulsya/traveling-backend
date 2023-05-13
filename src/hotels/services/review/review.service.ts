import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from 'src/utils/entity/reviews.entity';
import { ValidateCreateReview } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Reviews)
    private repositoryReview: Repository<Reviews>,
  ) {}

  async createReview(data: ValidateCreateReview) {
    try {
      // validation is user has created review
      const findReview = await this.repositoryReview.findOne({
        where: {
          user: { id: data.userId },
        },
      });
      if (findReview)
        throw new HttpException(
          {
            status: 'error',
            message: 'you has created review',
          },
          HttpStatus.BAD_REQUEST,
        );

      const newReview = await this.repositoryReview.create({
        ...data,
        hotel: { id: data.hotelId },
        user: { id: data.userId },
      });

      return this.repositoryReview.save(newReview);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
