import { createZodDto } from 'nestjs-zod';
import { UserSchema } from '../schema/users.schema';

export class CreateUserDto extends createZodDto(UserSchema) {}
