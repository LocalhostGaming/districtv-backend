import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DiscordService } from 'src/integration/discord/discord.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionCodesService } from 'src/sessionCodes/sessionCodes.service';

@Injectable()
export class SessionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sessionCodesService: SessionCodesService,
    private readonly discordService: DiscordService,
    private readonly jwtService: JwtService,
  ) {}

  async play(
    userId: string,
    playerId: string,
    code: string,
    userAgent: string,
    ipAddress: string,
  ) {
    // validate session code
    await this.sessionCodesService.validate(userId, code);

    // remove code from sessionCode table
    await this.sessionCodesService.remove(code);

    // get discordId
    const discord = await this.discordService.getByUserId(userId);
    const discordId = discord.id;

    // create play session
    await this.prismaService.session.create({
      data: {
        ipAddress,
        userAgent,
        userId,
      },
    });

    // sign play token
    const playToken = this.jwtService.sign({ userId, playerId, discordId });

    return {
      playToken,
    };
  }
}