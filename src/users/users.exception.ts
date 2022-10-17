import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(message?: string) {
    super(message ? message : `User already exists`, HttpStatus.FORBIDDEN);
  }
}

export class UserRecordNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message ? message : `User does not exists`, HttpStatus.NOT_FOUND);
  }
}
