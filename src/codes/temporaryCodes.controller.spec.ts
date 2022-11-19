import { Test, TestingModule } from '@nestjs/testing';
import { DiscordModule } from 'src/integration/discord/discord.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TemporaryCodesController } from './temporaryCodes.controller';
import { TemporaryCodesService } from './temporaryCodes.service';

describe('TemporaryCodesController', () => {
  let controller: TemporaryCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, DiscordModule],
      controllers: [TemporaryCodesController],
      providers: [TemporaryCodesService],
      exports: [TemporaryCodesService],
    }).compile();

    controller = module.get<TemporaryCodesController>(TemporaryCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
