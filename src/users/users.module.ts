import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UsersController } from './controllers/users/users.controller';

@Module({
  controllers: [UserController, UsersController],
})
export class UsersModule {}
