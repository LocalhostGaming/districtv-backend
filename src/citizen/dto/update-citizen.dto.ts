import { createZodDto } from 'nestjs-zod';
import { CitizenPayloadSchema } from '../schema/citizen.schema';

export class UpdateCitizenDto extends createZodDto(
  CitizenPayloadSchema.partial(),
) {}
