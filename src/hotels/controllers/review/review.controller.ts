import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Access } from 'src/auth/roles.decorator';
import { CreateReviewDto } from 'src/hotels/dto/createReview.dto';
import { ReviewService } from 'src/hotels/services/review/review.service';
import { Role } from 'src/utils/roles';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(RolesGuard)
  @Access(Role.User)
  @Post('/create')
  async createReview(@Request() req) {
    const { id, username, email } = req.user;
    const data: CreateReviewDto = {
      ...req.body,
      userId: id,
      name: username,
      email,
    };
    return await this.reviewService.createReview(data);
  }
}
