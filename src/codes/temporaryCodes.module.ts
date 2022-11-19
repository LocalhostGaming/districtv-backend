import { Module } from '@nestjs/common';
import { DiscordModule } from 'src/integration/discord/discord.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TemporaryCodesController } from './temporaryCodes.controller';
import { TemporaryCodesService } from './temporaryCodes.service';

@Module({
  imports: [PrismaModule, DiscordModule],
  controllers: [TemporaryCodesController],
  providers: [TemporaryCodesService],
  exports: [TemporaryCodesService],
})
export class TemporaryCodesModule {}
