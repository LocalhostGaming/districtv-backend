import { HttpException, HttpStatus } from '@nestjs/common';

export class UnverifiedDiscordException extends HttpException {
  constructor() {
    super(
      'Discord email is unverified, please verify your email to continue',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
