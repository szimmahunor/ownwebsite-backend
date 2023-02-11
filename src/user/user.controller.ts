import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { Controller } from '@nestjs/common';
import { Body, Get, Patch, UseGuards } from '@nestjs/common/decorators';
import { GetUser } from '../auth/decorator';
import { UserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  update(@Body() dto: UserDto) {
    return this.userService.updatePassword(dto);
  }
}
