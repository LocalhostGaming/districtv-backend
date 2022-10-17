import { createZodDto } from 'nestjs-zod';
import { UserSchema } from '../users.schema';

export class CreateUserDto extends createZodDto(UserSchema) {}
