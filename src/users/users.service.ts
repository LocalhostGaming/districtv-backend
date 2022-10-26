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
  UserAlreadyExistsException,
  UserRecordNotFoundException,
} from 'src/errors';
import { isPrismaKnownError } from 'src/helpers/prismaError';
import { prismaSelect } from 'src/helpers/prismaSelect';

const userSelectWithPassword = prismaSelect(
  'password',
  'id',
  'email',
  'username',
  'createdAt',
  'updatedAt',
);

const userSelect = prismaSelect(
  'id',
  'username',
  'email',
  'createdAt',
  'updatedAt',
);

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const { password } = data;

    const hash = await argon2.hash(password);

    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          password: hash,
        },
        select: userSelect,
      });
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
      select: userSelect,
    });
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: userSelect,
    });
  }

  async findOneWithPassword(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: userSelectWithPassword,
    });
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data,
        select: userSelect,
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

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
        select: userSelect,
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
