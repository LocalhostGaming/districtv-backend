import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/constants/ENV';
import { DiscordModule } from 'src/integration/discord/discord.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionCodesModule } from 'src/sessionCodes/sessionCodes.module';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: ENV.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: ENV.JWT_TOKEN_EXP },
    }),
    DiscordModule,
    SessionCodesModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
