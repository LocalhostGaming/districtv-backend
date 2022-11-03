import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/constants/ENV';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: ENV.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: ENV.JWT_TOKEN_EXP },
    }),
    PrismaModule,
  ],
  providers: [DiscordService],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
