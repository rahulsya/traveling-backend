import {
  Controller,
  Get,
  Post,
  Req,
  HttpException,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/auth/guard.decorator';
import { UserService } from 'src/users/services/user.service';
import { CreateUserDto } from '../../dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  user() {
    return 'api user';
  }

  @Public()
  @Post('/create')
  async createUser(@Req() request: Request) {
    try {
      const data: CreateUserDto = request.body;
      return await this.userService.createUser(data);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/all')
  async findAll(@Response() res) {
    const users = await this.userService.allUser();
    return res.json({
      status: 'success',
      data: users,
    });
  }
}
