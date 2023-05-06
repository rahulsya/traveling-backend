import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Response,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/guard.decorator';
import { UserService } from 'src/users/services/user.service';
import { CreateUserDto } from '../../dto/createUser.dto';
import { Role } from 'src/utils/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Access } from 'src/auth/roles.decorator';

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
  async createUser(@Body() userData: CreateUserDto, @Response() res) {
    try {
      const user = await this.userService.createUser(userData);
      return res.json({
        status: 200,
        user,
      });
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

  // @Public(Role.Admin)
  @UseGuards(RolesGuard)
  @Get('/all')
  @Access(Role.User)
  async findAll(@Response() res) {
    const users = await this.userService.allUser();
    return res.json({
      status: 'success',
      data: users,
    });
  }
}
