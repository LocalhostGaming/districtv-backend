import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';
import { DiscordModule } from './integration/discord/discord.module';
import { TemporaryCodesModule } from './codes/temporaryCodes.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PlayersModule,
    DiscordModule,
    TemporaryCodesModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
