import { createZodDto } from 'nestjs-zod';
import { DiscordSchema } from '../schema/discord.schema';

export class CreateDiscordDto extends createZodDto(DiscordSchema) {}
