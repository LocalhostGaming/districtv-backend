import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import {
  ERROR_CODE_DUPLICATE_KEY,
  ERROR_CODE_RECORD_NOT_FOUND,
} from 'src/constants/ERROR_CODES';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  InvalidDiscordTokens,
  UserAlreadyExistsException,
  UserRecordNotFoundException,
} from 'src/errors';
import { isPrismaKnownError } from 'src/helpers/prismaError';
import { UserSelect } from './users.select';
import { firstValueFrom } from 'rxjs';
import { UnverifiedDiscordException } from 'src/errors/discord.exception';
import { JwtService } from '@nestjs/jwt';
import { DiscordService } from 'src/integration/discord/discord.service';
import { DiscordAccessTokenDto } from 'src/integration/discord/dto/discord.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly discordService: DiscordService,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto, discordTokens: string) {
    const { password } = data;

    const hash = await argon2.hash(password);

    if (!discordTokens) throw new InvalidDiscordTokens();

    const tokens = this.jwtService.verify<DiscordAccessTokenDto>(discordTokens);

    const discordMe = await firstValueFrom(
      await this.discordService.me(tokens.access_token),
    );

    if (!discordMe.verified) throw new UnverifiedDiscordException();

    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          email: discordMe.email,
          password: hash,
        },
        select: UserSelect,
      });

      await this.discordService.create(user.id, {
        avatar: discordMe.avatar,
        discordId: discordMe.id,
        discriminator: discordMe.discriminator,
        email: discordMe.email,
        username: discordMe.username,
        refreshToken: tokens.refresh_token,
      });

      return user;
    } catch (error) {
      if (
        isPrismaKnownError(error) &&
        error.code === ERROR_CODE_DUPLICATE_KEY
      ) {
        throw new UserAlreadyExistsException();
      }

      throw error;
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return await this.prisma.user.findMany({
      ...params,
      select: UserSelect,
    });
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: UserSelect,
    });
  }

  async findOneWithPassword(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data,
        select: UserSelect,
      });

      return user;
    } catch (error) {
      if (
        isPrismaKnownError(error) &&
        error.code === ERROR_CODE_RECORD_NOT_FOUND
      ) {
        throw new UserRecordNotFoundException();
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
        select: UserSelect,
      });
    } catch (error) {
      if (
        isPrismaKnownError(error) &&
        error.code === ERROR_CODE_RECORD_NOT_FOUND
      ) {
        throw new UserRecordNotFoundException();
      }

      throw error;
    }
  }
}
