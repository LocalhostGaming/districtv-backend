import { z } from 'nestjs-zod/z';

export const CitizenSchema = z.object({
  playerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.dateString(),
  gender: z.enum(['male', 'female', 'others']),
});
