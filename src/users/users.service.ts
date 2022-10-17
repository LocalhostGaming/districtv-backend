import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import {
  DUPLICATE_KEY_ERROR_CODE,
  RECORD_NOT_FOUND_ERROR_CODE,
} from 'src/constants/ERROR_CODES';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserAlreadyExistsException,
  UserRecordNotFoundException,
} from './users.exception';

const DEFAULT_SELECT = {
  id: true,
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

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
        select: DEFAULT_SELECT,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === DUPLICATE_KEY_ERROR_CODE
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
      select: DEFAULT_SELECT,
    });
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: DEFAULT_SELECT,
    });
  }

  async findOneWithPassword(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        ...DEFAULT_SELECT,
        password: true,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data,
        select: DEFAULT_SELECT,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === RECORD_NOT_FOUND_ERROR_CODE
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
        select: DEFAULT_SELECT,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === RECORD_NOT_FOUND_ERROR_CODE
      ) {
        throw new UserRecordNotFoundException();
      }

      throw error;
    }
  }
}
