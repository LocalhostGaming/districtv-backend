import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [AuthModule, UsersModule, PlayersModule, ConfigModule.forRoot()],
})
export class AppModule {}
