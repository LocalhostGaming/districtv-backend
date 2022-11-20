import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { SessionCodesService } from './sessionCodes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guards';

@Controller('session-codes')
@ApiTags('Session Codes')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class SessionCodesController {
  constructor(private readonly temporaryCodesService: SessionCodesService) {}

  @Get('/generate')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Generate temporary code that can be used to claim play token',
  })
  generate(@Request() request) {
    return this.temporaryCodesService.generate(request.user.id);
  }
}
