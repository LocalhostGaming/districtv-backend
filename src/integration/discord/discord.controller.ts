import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { Intent } from '../enums/intent';
import { DiscordService } from './discord.service';

@ApiTags('Discord Integration')
@Controller('integration/discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('token/verify')
  @ApiQuery({
    name: 'code',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'state',
    type: String,
    required: true,
  })
  verifyToken(@Query('code') code: string, @Query('state') state: string) {
    return this.discordService.authorize(code, state);
  }

  @Post('token/refresh')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'refresh_token',
    type: String,
    required: true,
  })
  refreshToken(
    @Request() request,
    @Query('refresh_token') refreshToken: string,
  ) {
    return this.discordService.refreshToken(request.user.id, refreshToken);
  }

  @Get('authorization-url')
  @ApiQuery({
    name: 'intent',
    enum: Intent,
    required: true,
  })
  authorizationUrl(@Query('intent') intent: Intent) {
    return this.discordService.authorizationUrl(intent);
  }

  @Get('me')
  @ApiQuery({
    name: 'access_token',
    type: String,
    required: true,
  })
  me(@Query('access_token') accessToken: string) {
    return this.discordService.me(accessToken);
  }
}
