import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionDuplicate extends HttpException {
  constructor() {
    super('Session has already created', HttpStatus.FORBIDDEN);
  }
}
