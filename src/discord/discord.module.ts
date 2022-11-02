import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/constants/ENV';
import { DiscordService } from './discord.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: ENV.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
