import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CitizenModule } from 'src/citizen/citizen.module';
import { UsersModule } from 'src/users/users.module';
import { PlayerStrategy } from './strategies/player.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    CitizenModule,
    UsersModule,
    PassportModule.register({
      property: 'player',
    }),
  ],
  controllers: [PlayersController],
  providers: [PlayersService, PlayerStrategy],
})
export class PlayersModule {}
