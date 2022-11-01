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
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Prisma } from '@prisma/client';
import { RolesGuard } from 'src/roles/roles.guards';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { UseZodGuard } from 'nestjs-zod';
import { PlayerPayloadSchema } from './schema/player.schema';
import { Roles } from 'src/roles/roles.decorators';
import { Role } from 'src/roles/roles.enums';
import { PlayerGuard } from './guards/player.guard';

@ApiTags('Players')
@ApiBearerAuth()
@Controller('players')
@UseGuards(RolesGuard)
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  // CREATE PLAYER
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'Create Player',
    type: CreatePlayerDto,
  })
  @ApiOperation({ summary: 'Create new player' })
  create(@Request() request, @Body() createPlayerDto: CreatePlayerDto) {
    const userId = request.user.id;

    return this.playersService.create(userId, createPlayerDto);
  }

  // GET ALL PLAYERS
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all players' })
  findAll(
    @Body()
    payload: {
      skip?: number;
      take?: number;
      cursor?: Prisma.PlayerWhereUniqueInput;
      where?: Prisma.PlayerWhereInput;
      orderBy?: Prisma.PlayerOrderByWithRelationInput;
    },
  ) {
    return this.playersService.findAll(payload);
  }

  @Get('me')
  @UseGuards(PlayerGuard)
  @ApiOperation({ summary: 'Get currently logged in player details' })
  profile(@Request() request) {
    return request.player;
  }

  // GET SINGLE PLAYER
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get single player' })
  findOne(@Param('id') id: string) {
    return this.playersService.findOne({ id });
  }

  // UPDATE PLAYER
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseZodGuard('body', PlayerPayloadSchema.partial())
  @ApiOperation({ summary: 'Update player' })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  // DELETE PLAYER
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.MASTER)
  @ApiOperation({ summary: 'Delete player' })
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
