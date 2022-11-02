import { Module } from '@nestjs/common';
import { DiscordModule } from 'src/discord/discord.module';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';

@Module({
  imports: [DiscordModule],
  controllers: [IntegrationController],
  providers: [IntegrationService],
})
export class IntegrationModule {}
