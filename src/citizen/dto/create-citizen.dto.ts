import { createZodDto } from 'nestjs-zod';
import { CitizenPayloadSchema } from '../schema/citizen.schema';

export class CreateCitizenDto extends createZodDto(CitizenPayloadSchema) {}
