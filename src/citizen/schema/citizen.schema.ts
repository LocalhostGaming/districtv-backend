import { Gender } from '@prisma/client';
import { z } from 'nestjs-zod/z';

export const CitizenPayloadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dob: z.dateString(),
  gender: z.enum([Gender.female, Gender.male, Gender.other]),
});
