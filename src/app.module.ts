import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { CitizenService } from './citizen/citizen.service';
import { CitizenModule } from './citizen/citizen.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlayersService } from './players/players.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    PrismaModule,
    PlayersModule,
    CitizenModule,
  ],
  controllers: [AppController],
  providers: [AppService, PlayersService, CitizenService],
})
export class AppModule {}
