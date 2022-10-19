import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UseZodGuard } from 'nestjs-zod';

import { JwtAuthGuard } from 'src/auth/guards';

import { UsersService } from './users.service';
import { UserSchema } from './schema/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators';
import { Role } from 'src/enums';
import { RolesGuard } from 'src/guards';

@ApiTags('Users')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() request) {
    return request.user;
  }

  @Post()
  @UseZodGuard('body', UserSchema)
  @ApiBody({
    description: 'Create User',
    type: CreateUserDto,
  })
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOne({
      id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseZodGuard('body', UserSchema.partial())
  @ApiBody({
    description: 'Update User',
    type: UpdateUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
