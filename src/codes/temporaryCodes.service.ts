import { Injectable } from '@nestjs/common';
import { RecordNotFoundException } from 'src/errors';
import {
  InvalidUser,
  TemporaryCodeExpired,
} from 'src/errors/temporaryCode.exception';
import { DiscordService } from 'src/integration/discord/discord.service';
import { uuid } from 'uuidv4';
import { PrismaService } from '../prisma/prisma.service';
import { InvalidDiscord } from './../errors/temporaryCode.exception';

@Injectable()
export class TemporaryCodesService {
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

      const codes = await this.prismaService.temporaryCode.create({
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

  async validate(userId: string, discordId: string, code: string) {
    const temporaryCode = await this.prismaService.temporaryCode.findUnique({
      where: {
        code,
      },
    });

    if (!temporaryCode) throw new RecordNotFoundException({ model: 'Code' });

    // Check expiration
    console.log(temporaryCode.expiration.getTime(), new Date().getTime());
    if (new Date().getTime() >= temporaryCode.expiration.getTime())
      throw new TemporaryCodeExpired();

    // Check if the claiming user is the same user
    if (temporaryCode.userId !== userId) throw new InvalidUser();

    // Check if the claiming user discord id is the same
    if (temporaryCode.discordId !== discordId) throw new InvalidDiscord();

    return true;
  }
}
