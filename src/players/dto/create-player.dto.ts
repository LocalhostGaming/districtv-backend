import { createZodDto } from 'nestjs-zod';
import { PlayerSchema } from '../schema/player.schema';

export class CreatePlayerDto extends createZodDto(PlayerSchema) {}
