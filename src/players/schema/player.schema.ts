import { z } from 'nestjs-zod/z';

export const PlayerSchema = z.object({
  userId: z.string(),
});
