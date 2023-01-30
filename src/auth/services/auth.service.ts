import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/users/services/user.service';
import { User } from 'src/utils/entity/user.entity';
import { comparePassword } from 'src/utils/helpers';
import { ValidateUserDetails } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDetails: ValidateUserDetails): Promise<User | null> {
    const user = await this.userService.findUser(userDetails.username);

    if (!user)
      throw new HttpException('invalid credential', HttpStatus.UNAUTHORIZED);
    const isValidPassword = comparePassword(
      userDetails.password,
      user.password,
    );
    return isValidPassword ? user : null;
  }

  async login(user: User) {
    const payload = { username: user.username, email: user.email, id: user.id };
    return {
      status: 'success',
      user: {
        ...user,
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
