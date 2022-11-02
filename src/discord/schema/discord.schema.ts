import { z } from 'nestjs-zod/z';

export const DiscordSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  discriminator: z.string(),
  avatar: z.string(),
  refreshToken: z.string(),
});
