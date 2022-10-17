import { z } from 'nestjs-zod/z';
import { LoginSchema } from '../auth.schema';

export type LoginPayload = z.infer<typeof LoginSchema>;
