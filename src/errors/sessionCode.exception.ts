import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionCodeExpired extends HttpException {
  constructor() {
    super('Code is already expired', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidSessionCode extends HttpException {
  constructor() {
    super('Invalid session code', HttpStatus.BAD_REQUEST);
  }
}

export class InvalidSessionCodeUser extends HttpException {
  constructor() {
    super('Invalid session code user', HttpStatus.BAD_REQUEST);
  }
}

export class InvalidSessionCodeDiscord extends HttpException {
  constructor() {
    super('Invalid session code discord user', HttpStatus.BAD_REQUEST);
  }
}
