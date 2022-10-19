import { createZodDto } from 'nestjs-zod';
import { UserSchema } from '../schema/users.schema';

export class UpdateUserDto extends createZodDto(UserSchema.partial()) {}
