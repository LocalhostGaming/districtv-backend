import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from 'src/auth/strategies';
import { ENV } from 'src/constants/ENV';
import { DiscordModule } from 'src/discord/discord.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UserService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        DiscordModule,
        JwtModule.register({
          secret: ENV.JWT_TOKEN_SECRET,
        }),
      ],
      controllers: [UsersController],
      providers: [UsersService, JwtStrategy],
      exports: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
