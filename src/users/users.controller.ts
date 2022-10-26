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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UseZodGuard } from 'nestjs-zod';

import { JwtAuthGuard } from 'src/auth/guards';

import { UsersService } from './users.service';
import { UserSchema } from './schema/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/roles/roles.guards';
import { Roles } from 'src/roles/roles.decorators';
import { Role } from 'src/roles/roles.enums';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE USER
  @Post()
  @UseZodGuard('body', UserSchema)
  @ApiBody({
    description: 'Create User',
    type: CreateUserDto,
  })
  @ApiOperation({ summary: 'Create new user' })
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  // GET ALL USERS
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
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

  // GET LOGGED IN USER
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get currently logged in user details' })
  profile(@Request() request) {
    return request.user;
  }

  // GET SINGLE USER
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get single user' })
  findOneById(@Param('id') id: string) {
    return this.usersService.findOne({
      id,
    });
  }

  // UPDATE USER
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseZodGuard('body', UserSchema.partial())
  @ApiBody({
    description: 'Update User',
    type: UpdateUserDto,
  })
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // DELETE USER
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
