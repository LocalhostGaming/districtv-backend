import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(
      message ? message : `Invalid username or password`,
      HttpStatus.FORBIDDEN,
    );
  }
}
