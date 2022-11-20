import { Controller, Post, UseGuards, Request, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guards';
import { PlayerGuard } from './../players/guards/player.guard';

@Controller('sessions')
@ApiTags('Sessions')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('play')
  @UseGuards(JwtAuthGuard, PlayerGuard)
  @ApiQuery({
    name: 'code',
    type: String,
    required: true,
  })
  play(@Request() request, @Query('code') code: string) {
    return this.sessionsService.play(
      request.user.id,
      request.player.id,
      code,
      request.headers['user-agent'],
      request.ip,
    );
  }
}
