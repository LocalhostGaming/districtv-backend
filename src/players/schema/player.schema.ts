import { z } from 'nestjs-zod/z';
import { CitizenPayloadSchema } from 'src/citizen/schema/citizen.schema';

export const PlayerPayloadSchema = z.object({
  userId: z.string(),
  citizen: CitizenPayloadSchema,
});
