import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime';

export const isPrismaKnownError = (
  error: unknown,
): error is PrismaClientKnownRequestError =>
  error instanceof PrismaClientKnownRequestError;

export const isPrismaUnknownError = (
  error: unknown,
): error is PrismaClientUnknownRequestError =>
  error instanceof PrismaClientUnknownRequestError;
