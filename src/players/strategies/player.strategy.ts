import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtToken } from 'src/auth/auth.interface';
import { ENV } from 'src/constants/ENV';
import { PlayersService } from '../players.service';

@Injectable()
export class PlayerStrategy extends PassportStrategy(Strategy, 'player') {
  constructor(private playerService: PlayersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(token: JwtToken) {
    const userId = token.sub;

    const player = await this.playerService.findOneByUserId(userId);

    return player;
  }
}
