import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UseZodGuard } from 'nestjs-zod';

import { UsersService } from './users.service';
import { UserSchema } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseZodGuard('body', UserSchema)
  @ApiBody({
    description: 'Create User',
    type: CreateUserDto,
  })
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  findAll(
    @Body()
    payload: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
  ) {
    return this.usersService.findAll(payload);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOne({
      id,
    });
  }

  @Patch(':id')
  @UseZodGuard('body', UserSchema.partial())
  @ApiBody({
    description: 'Update User',
    type: UpdateUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
