import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DiscordService } from 'src/discord/discord.service';
import { Intent } from './enums/intent';

@ApiTags('Integration')
@Controller('integration')
export class IntegrationController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('discord/verify')
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

  @Get('discord/authorization-url')
  @ApiQuery({
    name: 'intent',
    enum: Intent,
    required: true,
  })
  authorizationUrl(@Query('intent') intent: Intent) {
    return this.discordService.authorizationUrl(intent);
  }
}
