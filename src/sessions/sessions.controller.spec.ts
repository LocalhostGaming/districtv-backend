import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ENV } from 'src/constants/ENV';
import { DiscordModule } from 'src/integration/discord/discord.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionCodesModule } from 'src/sessionCodes/sessionCodes.module';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

describe('SessionsController', () => {
  let controller: SessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        DiscordModule,
        SessionCodesModule,
        JwtModule.register({
          secret: ENV.JWT_TOKEN_SECRET,
          signOptions: { expiresIn: ENV.JWT_TOKEN_EXP },
        }),
      ],
      controllers: [SessionsController],
      providers: [SessionsService],
    }).compile();

    controller = module.get<SessionsController>(SessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
