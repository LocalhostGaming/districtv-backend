import { Injectable } from '@nestjs/common';
import {
  ERROR_CODE_DUPLICATE_KEY,
  ERROR_CODE_RECORD_NOT_FOUND,
} from 'src/constants/ERROR_CODES';
import { AlreadyExistsException, RecordNotFoundException } from 'src/errors';
import { isPrismaKnownError } from 'src/helpers/prismaError';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';

@Injectable()
export class CitizenService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCitizenDto) {
    try {
      return this.prisma.playerCitizen.create({
        data,
      });
    } catch (error) {
      if (
        isPrismaKnownError(error) &&
        error.code === ERROR_CODE_DUPLICATE_KEY
      ) {
        throw new AlreadyExistsException({ model: 'Citizen' });
      }

      throw error;
    }
  }

  async update(id: string, data: UpdateCitizenDto) {
    try {
      return this.prisma.playerCitizen.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      if (
        isPrismaKnownError(error) &&
        error.code === ERROR_CODE_RECORD_NOT_FOUND
      ) {
        throw new RecordNotFoundException({ model: 'Citizen' });
      }

      throw error;
    }
  }
}
