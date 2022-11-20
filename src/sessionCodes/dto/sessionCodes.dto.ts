import { createZodDto } from 'nestjs-zod';
import { SessionCodesCreateSchema } from '../schema/sessionCodes.schema';

export class CreateSessionCodeDto extends createZodDto(
  SessionCodesCreateSchema,
) {}
