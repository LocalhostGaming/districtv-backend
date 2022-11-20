import { Injectable } from '@nestjs/common';
import {
  InvalidSessionCode,
  InvalidSessionCodeDiscord,
  InvalidSessionCodeUser,
  SessionCodeExpired,
} from 'src/errors/sessionCode.exception';
import { DiscordService } from 'src/integration/discord/discord.service';
import { uuid } from 'uuidv4';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionCodesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly discordService: DiscordService,
  ) {}

  async generate(userId: string) {
    try {
      // Generate Random Code
      const code = uuid();

      // Create 10mins Expiration
      const date = new Date();
      const expiration = new Date(date.setMinutes(date.getMinutes() + 10));

      const discord = await this.discordService.getByUserId(userId);

      const codes = await this.prismaService.sessionCode.create({
        data: {
          code,
          discordId: discord.id,
          expiration,
          userId,
        },
      });

      console.log(codes);

      return {
        code,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  async validate(userId: string, code: string) {
    const sessionCode = await this.prismaService.sessionCode.findUnique({
      where: {
        code,
      },
    });

    if (!sessionCode) throw new InvalidSessionCode();

    // Check expiration
    if (new Date().getTime() >= sessionCode.expiration.getTime())
      throw new SessionCodeExpired();

    // Check if the claiming user is the same user
    if (sessionCode.userId !== userId) throw new InvalidSessionCodeUser();

    // Check if the claiming user discord id is the same
    const discord = await this.discordService.getByUserId(userId);
    if (sessionCode.discordId !== discord.id)
      throw new InvalidSessionCodeDiscord();

    return true;
  }

  async remove(code: string) {
    const sessionCode = await this.prismaService.sessionCode.findUnique({
      where: {
        code,
      },
    });

    if (!sessionCode) throw new InvalidSessionCode();

    return await this.prismaService.sessionCode.delete({
      where: {
        code,
      },
    });
  }
}
