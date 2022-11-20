import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionDuplicate extends HttpException {
  constructor() {
    super('Session is already created', HttpStatus.FORBIDDEN);
  }
}
