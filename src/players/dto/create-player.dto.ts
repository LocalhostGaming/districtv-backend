import { createZodDto } from 'nestjs-zod';
import { PlayerPayloadSchema } from '../schema/player.schema';

export class CreatePlayerDto extends createZodDto(PlayerPayloadSchema) {}
