import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ENV } from 'src/constants/ENV';
import { JwtToken } from '../auth.interface';
import { UsersService } from 'src/users/users.service';
import { RecordNotFoundException } from 'src/errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV.JWT_TOKEN_SECRET,
    });
  }

  async validate(token: JwtToken) {
    const user = await this.userService.findOne({ id: token.sub });

    if (!user) throw new RecordNotFoundException({ model: 'User' });

    return user;
  }
}
