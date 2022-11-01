import { z } from 'nestjs-zod/z';
import { CitizenPayloadSchema } from 'src/citizen/schema/citizen.schema';

export const PlayerPayloadSchema = z.object({
  citizen: CitizenPayloadSchema,
});
