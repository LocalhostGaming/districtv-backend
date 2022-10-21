import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  DUPLICATE_KEY_ERROR_CODE,
  RECORD_NOT_FOUND_ERROR_CODE,
} from 'src/constants/ERROR_CODES';
import { AlreadyExistsException, RecordNotFoundException } from 'src/errors';
import { isPrismaKnownError } from 'src/helpers/prismaError';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto) {
    try {
      return await this.prisma.player.create({
        data: createPlayerDto,
      });
    } catch (error) {
      if (
        isPrismaKnownError(error) &&
        error.code === DUPLICATE_KEY_ERROR_CODE
      ) {
        throw new AlreadyExistsException({ model: 'Player' });
      }

      throw error;
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlayerWhereUniqueInput;
    where?: Prisma.PlayerWhereInput;
    orderBy?: Prisma.PlayerOrderByWithRelationInput;
  }) {
    return await this.prisma.player.findMany({
      ...params,
    });
  }

  async findOne(playerWhereUniqueInput: Prisma.PlayerWhereUniqueInput) {
    return await this.prisma.player.findUnique({
      where: playerWhereUniqueInput,
    });
  }

  async update(id: string, data: UpdatePlayerDto) {
    try {
      return await this.prisma.player.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      if (
        isPrismaKnownError(error) &&
        error.code === RECORD_NOT_FOUND_ERROR_CODE
      ) {
        throw new RecordNotFoundException({ model: 'Player' });
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.player.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === RECORD_NOT_FOUND_ERROR_CODE
      ) {
        throw new RecordNotFoundException({ model: 'Player' });
      }

      throw error;
    }
  }
}
