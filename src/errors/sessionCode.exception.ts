import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionCodeExpired extends HttpException {
  constructor() {
    super('Code is already expired', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidUser extends HttpException {
  constructor() {
    super('The user you provide is not valid', HttpStatus.NOT_ACCEPTABLE);
  }
}

export class InvalidDiscord extends HttpException {
  constructor() {
    super(
      'The discord user you provide is not valid',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
