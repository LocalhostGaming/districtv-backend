import { createZodDto } from 'nestjs-zod';
import { PlayerSchema } from '../schema/player.schema';

export class UpdatePlayerDto extends createZodDto(PlayerSchema.partial()) {}
