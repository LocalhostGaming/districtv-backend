import { createZodDto } from 'nestjs-zod';
import { TemporaryCodesCreateSchema } from '../schema/temporaryCodes.schema';

export class CreateTemporaryCodeDto extends createZodDto(
  TemporaryCodesCreateSchema,
) {}
