import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import {
  ERROR_CODE_DUPLICATE_KEY,
  ERROR_CODE_RECORD_NOT_FOUND,
} from 'src/constants/ERROR_CODES';
import { RecordNotFoundException } from 'src/errors';
import { DiscordService } from 'src/integration/discord/discord.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionCodesService } from 'src/sessionCodes/sessionCodes.service';
import { isPrismaKnownError } from './../helpers/prismaError';

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

    // get discordId
    const discord = await this.discordService.getByUserId(userId);
    const discordId = discord.id;

    try {
      // create play session
      await this.prismaService.session.create({
        data: {
          ipAddress,
          userAgent,
          userId,
        },
      });

      // remove code from sessionCode table
      await this.sessionCodesService.remove(code);

      // sign play token
      const playToken = this.jwtService.sign({ userId, playerId, discordId });

      return {
        playToken,
      };
    } catch (error: unknown) {
      if (isPrismaKnownError(error)) {
        if (error.code === ERROR_CODE_DUPLICATE_KEY) {
          // Remove Session from Database
          await this.remove(userId);

          // Disconnect Current Session - Todo

          // Create new Session
          return await this.play(userId, playerId, code, userAgent, ipAddress);
        }
      }
    }
  }

  async remove(userId: string) {
    try {
      await this.prismaService.session.delete({
        where: {
          userId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === ERROR_CODE_RECORD_NOT_FOUND
      ) {
        throw new RecordNotFoundException({ model: 'Session' });
      }

      throw error;
    }
  }
}
