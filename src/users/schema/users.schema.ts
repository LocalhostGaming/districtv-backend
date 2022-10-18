import { z } from 'nestjs-zod/z';

export const UserSchema = z.object({
  username: z.string().min(4).max(32),
  email: z.string().email(),
  password: z
    .password()
    .min(6)
    .max(100)
    .atLeastOne('digit')
    .atLeastOne('lowercase')
    .atLeastOne('uppercase'),
});
