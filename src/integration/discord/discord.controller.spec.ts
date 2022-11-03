import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ENV } from 'src/constants/ENV';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';

describe('DiscordController', () => {
  let controller: DiscordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<DiscordController>(DiscordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
