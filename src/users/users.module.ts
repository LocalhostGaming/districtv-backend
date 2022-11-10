import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/constants/ENV';
import { DiscordModule } from 'src/integration/discord/discord.module';

@Module({
  imports: [
    PrismaModule,
    DiscordModule,
    JwtModule.register({
      secret: ENV.JWT_TOKEN_SECRET,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
