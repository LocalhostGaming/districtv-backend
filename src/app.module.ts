import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot(), PlayersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
