import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ENV } from 'src/constants/ENV';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiscordService } from './discord.service';

describe('DiscordService', () => {
  let service: DiscordService;

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
    }).compile();

    service = module.get<DiscordService>(DiscordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
