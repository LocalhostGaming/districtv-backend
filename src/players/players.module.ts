import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CitizenModule } from 'src/citizen/citizen.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, CitizenModule, UsersModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
