import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from 'src/auth/strategies';
import { DiscordModule } from 'src/discord/discord.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, DiscordModule],
      controllers: [UsersController],
      providers: [UsersService, JwtStrategy],
      exports: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
