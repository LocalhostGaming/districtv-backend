import { createZodDto } from 'nestjs-zod';
import { UserSchema } from '../users.schema';

export class UpdateUserDto extends createZodDto(UserSchema.partial()) {}
