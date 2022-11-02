import { Test, TestingModule } from '@nestjs/testing';
import { DiscordModule } from 'src/discord/discord.module';
import { IntegrationController } from './integration.controller';

describe('IntegrationController', () => {
  let controller: IntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DiscordModule],
      controllers: [IntegrationController],
    }).compile();

    controller = module.get<IntegrationController>(IntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
