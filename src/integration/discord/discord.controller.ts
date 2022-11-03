import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Intent } from '../enums/intent';
import { DiscordService } from './discord.service';

@ApiTags('Discord Integration')
@Controller('integration/discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('verify')
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
  verify(@Query('code') code: string, @Query('state') state: string) {
    return this.discordService.authorize(code, state);
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
}
