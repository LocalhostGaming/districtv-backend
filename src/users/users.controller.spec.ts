import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from 'src/auth/strategies';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UsersController],
      providers: [UsersService, JwtStrategy],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
