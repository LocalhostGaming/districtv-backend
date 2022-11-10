import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid/async';
import { DISCORD, GRANT_TYPE } from 'src/constants/DISCORD';
import { ENV } from 'src/constants/ENV';
import { URLSearchParams } from 'url';
import { catchError, firstValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDiscordDto,
  DiscordMeResponseDto,
  DiscordAccessTokenDto,
  UpdateDiscordDto,
} from './dto/discord.dto';
import { Prisma } from '@prisma/client';
import { Intent } from '../enums/intent';

const defaultScopes = ['identify', 'email'];
const meURL = 'https://discord.com/api/users/@me';

@Injectable()
export class DiscordService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(userId: string, payload: CreateDiscordDto) {
    return this.prismaService.discordIntegration.create({
      data: {
        userId,
        ...payload,
      },
    });
  }

  async update(
    where: Prisma.DiscordIntegrationWhereUniqueInput,
    payload: UpdateDiscordDto,
  ) {
    return this.prismaService.discordIntegration.update({
      where,
      data: {
        ...payload,
      },
    });
  }

  async me(accessToken: string) {
    const response = await this.httpService.get<DiscordMeResponseDto>(meURL, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    return response.pipe(
      map((response) => response.data),
      catchError((error) => {
        const message = error.response.data?.error_description || error.message;
        Logger.error(message);
        throw new HttpException(message, error.response.status);
      }),
    );
  }

  /**
   *
   * @param intent launcher or website
   * @returns discord authorization url
   */
  async authorizationUrl(intent: Intent) {
    if (!ENV.DISCORD_CLIENT_ID || !ENV.DISCORD_REDIRECT_URI)
      throw new Error('DISCORD_CLIENT_ID or DISCORD_REDIRECT_URI is required');

    const state = await this.generateState(intent);

    const params = {
      client_id: ENV.DISCORD_CLIENT_ID,
      redirect_uri: ENV.DISCORD_REDIRECT_URI,
      response_type: 'code',
      scope: defaultScopes.join(' '),
      state,
    };

    const url = new URL(DISCORD.AUTHORIZATION_URL);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }

    return {
      url,
    };
  }

  /**
   * This will check if code and state returned from discord is valid
   * @param code temporary code from discord
   * @param state signed state with intent and random id
   * @returns  DiscordAccessTokenDto
   */
  async authorize(code: string, state: string) {
    await this.verifyState(state);

    if (
      !ENV.DISCORD_CLIENT_ID ||
      !ENV.DISCORD_CLIENT_SECRET ||
      !ENV.DISCORD_REDIRECT_URI
    )
      throw new Error(
        'DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET and DISCORD_REDIRECT_URI is required',
      );

    const params = new URLSearchParams({
      client_id: ENV.DISCORD_CLIENT_ID,
      client_secret: ENV.DISCORD_CLIENT_SECRET,
      redirect_uri: ENV.DISCORD_REDIRECT_URI,
      grant_type: GRANT_TYPE.AUTHORIZATION_CODE,
      code,
    });

    const response = await this.httpService
      .post<DiscordAccessTokenDto>(DISCORD.TOKEN_URL, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          const message =
            error.response.data?.error_description || error.message;
          Logger.error(message);
          throw new HttpException(message, error.response.status);
        }),
      );

    const data = await firstValueFrom(response);

    const tokens = this.jwtService.sign(data);

    return {
      tokens,
    };
  }

  /**
   * This will refresh discord's access_token
   * @param refreshToken from discord
   * @returns returns DiscordAccessTokenDto
   */
  async refreshToken(userId: string, refreshToken: string) {
    if (!ENV.DISCORD_CLIENT_ID || !ENV.DISCORD_CLIENT_SECRET)
      throw new Error(
        'DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET is required',
      );

    const params = new URLSearchParams({
      client_id: ENV.DISCORD_CLIENT_ID,
      client_secret: ENV.DISCORD_CLIENT_SECRET,
      grant_type: GRANT_TYPE.REFRESH_TOKEN,
      refresh_token: refreshToken,
    });

    const response = await this.httpService
      .post<DiscordAccessTokenDto>(DISCORD.TOKEN_URL, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          const message =
            error.response.data?.error_description || error.message;
          Logger.error(message);
          throw new HttpException(message, error.response.status);
        }),
      );

    const data = await firstValueFrom(response);

    await this.update({ userId }, { refreshToken: data.refresh_token });

    return data;
  }

  /**
   * This will generate signed state for security purposes
   * @param intent launcher or website
   * @returns signed state
   */
  async generateState(intent: Intent) {
    const id = await nanoid();

    const token = await this.jwtService.signAsync({ id, intent });
    const state = Buffer.from(token).toString('base64');

    return state;
  }

  /**
   * This will verify if state is valid
   * @param state signed state
   * @returns parsed jwt payload object
   */
  async verifyState(state: string) {
    try {
      const token = Buffer.from(state, 'base64').toString('utf-8');
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      if ((error as any).name === 'TokenExpiredError') {
        Logger.error('Expired Jwt Token');
      }

      throw new HttpException(
        'Invalid state. Please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
