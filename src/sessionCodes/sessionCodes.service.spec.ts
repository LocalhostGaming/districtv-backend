import { Test, TestingModule } from '@nestjs/testing';
import { DiscordModule } from 'src/integration/discord/discord.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionCodesController } from './sessionCodes.controller';
import { SessionCodesService } from './sessionCodes.service';

describe('CodesService', () => {
  let service: SessionCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, DiscordModule],
      controllers: [SessionCodesController],
      providers: [SessionCodesService],
      exports: [SessionCodesService],
    }).compile();

    service = module.get<SessionCodesService>(SessionCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
