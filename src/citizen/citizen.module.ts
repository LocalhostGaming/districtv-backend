import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CitizenService } from './citizen.service';

@Module({
  imports: [PrismaModule],
  providers: [CitizenService],
  exports: [CitizenService],
})
export class CitizenModule {}
