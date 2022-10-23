import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { CitizenService } from './citizen/citizen.service';
import { CitizenModule } from './citizen/citizen.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlayersService } from './players/players.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { PlayersController } from './players/players.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PlayersModule,
    CitizenModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    PlayersController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    PlayersService,
    CitizenService,
    JwtService,
  ],
})
export class AppModule {}
