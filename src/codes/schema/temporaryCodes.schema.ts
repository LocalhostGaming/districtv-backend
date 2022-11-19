import { z } from 'nestjs-zod/z';

export const TemporaryCodesSchema = z.object({
  code: z.string(),
});

export const TemporaryCodesCreateSchema = z.object({
  userId: z.string(),
  discordId: z.string(),
  code: z.string(),
  expiration: z.date().or(z.string()),
});
