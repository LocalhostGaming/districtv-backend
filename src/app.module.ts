import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';
import { DiscordModule } from './discord/discord.module';
import { IntegrationService } from './integration/integration.service';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PlayersModule,
    IntegrationModule,
    DiscordModule,
    ConfigModule.forRoot(),
  ],
  providers: [IntegrationService],
})
export class AppModule {}
