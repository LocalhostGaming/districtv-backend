import { z } from 'nestjs-zod/z';

export const LoginSchema = z.object({
  username: z.string().min(4).max(32),
  password: z
    .password()
    .min(6)
    .max(100)
    .atLeastOne('digit')
    .atLeastOne('lowercase')
    .atLeastOne('uppercase'),
});
