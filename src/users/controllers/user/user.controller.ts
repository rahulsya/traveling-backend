import {
  Controller,
  Get,
  Post,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/users/services/user.service';
import { CreateUserDto } from '../../dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  user() {
    return 'api user';
  }

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

  @Post('/login')
  login() {
    return 'login path';
  }
}
