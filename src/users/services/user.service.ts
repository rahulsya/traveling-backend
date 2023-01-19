import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/utils/entity/user.entity';
import { CreateUser } from 'src/utils/types';
import { hashPassword } from '../../utils/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: CreateUser) {
    const findUser = await this.userRepository.findOne({
      where: { username: userDetails.username },
    });
    if (findUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const password = hashPassword(userDetails.password);
    const newUser = await this.userRepository.create({
      ...userDetails,
      password,
    });
    return this.userRepository.save(newUser);
  }

  async findUser(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  async allUser(): Promise<Array<User>> {
    const users = await this.userRepository.find({
      select: {
        username: true,
        email: true,
      },
    });
    return users;
  }
}
