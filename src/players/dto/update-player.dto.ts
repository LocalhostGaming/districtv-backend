import { createZodDto } from 'nestjs-zod';
import { PlayerPayloadSchema } from '../schema/player.schema';

export class UpdatePlayerDto extends createZodDto(
  PlayerPayloadSchema.deepPartial(),
) {}
