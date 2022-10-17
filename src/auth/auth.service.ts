import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import * as argon2 from 'argon2';
import { UnauthorizedException } from './auth.exception';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneWithPassword({ username });

    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await argon2.verify(user.password, password);

    if (isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
