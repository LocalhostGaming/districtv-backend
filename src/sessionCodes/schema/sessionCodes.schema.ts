import { z } from 'nestjs-zod/z';

export const SessionCodesSchema = z.object({
  code: z.string(),
});

export const SessionCodesCreateSchema = z.object({
  userId: z.string(),
  discordId: z.string(),
  code: z.string(),
  expiration: z.date().or(z.string()),
});
