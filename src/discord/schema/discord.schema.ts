import { z } from 'nestjs-zod/z';

export const DiscordIntegrationSchema = z.object({
  discordId: z.string(),
  username: z.string(),
  email: z.string().email(),
  discriminator: z.string(),
  avatar: z.string(),
  refreshToken: z.string(),
});

export const DiscordMeSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string(),
  avatar_decoration: z.string().nullable(),
  discriminator: z.string(),
  public_flags: z.number(),
  flags: z.number(),
  banner: z.string().nullable(),
  banner_color: z.string(),
  accent_color: z.string(),
  locale: z.string(),
  mfa_enabled: z.boolean(),
  premium_type: z.number(),
  email: z.string().email(),
  verified: z.boolean(),
});

export const DiscordTokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
});
