import { createZodDto } from 'nestjs-zod';
import { DiscordSchema } from '../schema/discord.schema';

export class UpdateDiscordDto extends createZodDto(DiscordSchema.partial()) {}
