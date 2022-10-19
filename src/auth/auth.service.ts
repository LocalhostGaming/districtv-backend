import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { InvalidCredentialsException } from 'src/errors/auth.exception';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneWithPassword({ username });

    if (!user) throw new InvalidCredentialsException();

    const isPasswordValid = await argon2.verify(user.password, password);

    if (isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login({ username, id }: Prisma.UserSelect) {
    const payload = { username, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
