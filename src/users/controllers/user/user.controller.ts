import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Response,
} from '@nestjs/common';
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
  async createUser(@Body() userData: CreateUserDto) {
    try {
      return await this.userService.createUser(userData);
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
