import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENV } from 'src/constants/ENV';
import { UnauthorizedException } from 'src/errors';
import { AuthService } from '../auth.service';

export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: ENV.REFRESH_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(
      payload.username,
      payload.password,
    );

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
