import { HttpException, HttpStatus } from '@nestjs/common';

export class UnverifiedDiscordException extends HttpException {
  constructor() {
    super(
      'Discord email is unverified, please verify your email to continue',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class NoDiscordIntegration extends HttpException {
  constructor() {
    super('No Discord Integration Found', HttpStatus.NOT_FOUND);
  }
}
