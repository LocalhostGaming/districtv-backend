import { Module } from '@nestjs/common';
import { DiscordModule } from 'src/integration/discord/discord.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionCodesController } from './sessionCodes.controller';
import { SessionCodesService } from './sessionCodes.service';

@Module({
  imports: [PrismaModule, DiscordModule],
  controllers: [SessionCodesController],
  providers: [SessionCodesService],
  exports: [SessionCodesService],
})
export class SessionCodesModule {}
