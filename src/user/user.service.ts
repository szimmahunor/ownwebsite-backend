import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updatePassword(dto: UserDto) {
    // generate password hash
    const hash = await argon.hash(dto.password);

    // save the user to database
    const user = await this.prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        hash,
      },
    });

    delete user.hash;

    // return jwt token
    return user;
  }
}
