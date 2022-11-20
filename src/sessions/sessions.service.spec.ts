import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ENV } from 'src/constants/ENV';
import { DiscordModule } from 'src/integration/discord/discord.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionCodesModule } from 'src/sessionCodes/sessionCodes.module';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

describe('SessionsService', () => {
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      exports: [SessionsService],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
