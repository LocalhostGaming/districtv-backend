import { Injectable } from '@nestjs/common';
import { Player, Prisma } from '@prisma/client';
import { CitizenService } from 'src/citizen/citizen.service';
import {
  ERROR_CODE_DUPLICATE_KEY,
  ERROR_CODE_RECORD_NOT_FOUND,
} from 'src/constants/ERROR_CODES';
import { AlreadyExistsException, RecordNotFoundException } from 'src/errors';
import { isPrismaKnownError } from 'src/helpers/prismaError';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerSelect } from './player.select';

@Injectable()
export class PlayersService {
  constructor(
    private prisma: PrismaService,
    private citizenService: CitizenService,
  ) {}

  async create(userId: string, payload: CreatePlayerDto) {
    try {
      const { citizen: citizenPayload } = payload;

      // Check if user has a player (one player per user only for now)
      const hasPlayer = await this.findAll({
        where: {
          userId,
        },
      });

      if (hasPlayer.length > 0)
        throw new AlreadyExistsException({ model: 'Player' });

      // Create Player Citizen
      const citizen = await this.citizenService.create(citizenPayload);

      // Create Player Position

      // Create Player Stats

      const player = await this.prisma.player.create({
        data: {
          userId,
          citizenId: citizen.id,
        },
        select: PlayerSelect,
      });

      return player;
    } catch (error) {
      if (
        isPrismaKnownError(error) &&
        error.code === ERROR_CODE_DUPLICATE_KEY
      ) {
        throw new AlreadyExistsException({ model: 'Player' });
      }

      throw error;
    }
  }

  async update(playerId: string, payload: UpdatePlayerDto): Promise<Player> {
    try {
      const { citizen: citizenPayload, ...playerPayload } = payload;

      const player = await this.prisma.player.update({
        where: {
          id: playerId,
        },
        data: playerPayload,
      });

      // Update Player Citizen
      if (citizenPayload) {
        if (!player.citizenId)
          throw new RecordNotFoundException({ model: 'Citizen' });

        this.citizenService.update(player.citizenId, citizenPayload);
      }

      return player;
    } catch (error) {
      if (
        isPrismaKnownError(error) &&
        error.code === ERROR_CODE_RECORD_NOT_FOUND
      ) {
        throw new RecordNotFoundException({ model: 'Player' });
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
      select: PlayerSelect,
    });
  }

  async findOne(playerWhereUniqueInput: Prisma.PlayerWhereUniqueInput) {
    const player = await this.prisma.player.findUnique({
      where: playerWhereUniqueInput,
      select: PlayerSelect,
    });

    if (!player) throw new RecordNotFoundException({ model: 'Player' });

    return player;
  }

  async findOneByUserId(userId: string) {
    const players = await this.prisma.player.findMany({
      where: {
        userId,
      },
      select: PlayerSelect,
    });

    if (players.length <= 0)
      throw new RecordNotFoundException({ model: 'Player' });

    // for now users can only have one player
    return players[0];
  }

  async remove(id: string): Promise<Player> {
    try {
      return await this.prisma.player.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === ERROR_CODE_RECORD_NOT_FOUND
      ) {
        throw new RecordNotFoundException({ model: 'Player' });
      }

      throw error;
    }
  }
}
