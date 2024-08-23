import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/Users/users.repository';
import { AuthRepository } from './auth.repository';
import { UsersModule } from 'src/Users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository]
})
export class AuthModule {}
