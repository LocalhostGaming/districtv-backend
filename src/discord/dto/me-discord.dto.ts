import { createZodDto } from 'nestjs-zod';
import { DiscordMeSchema } from '../schema/discord.schema';

export class DiscordMeResponseDto extends createZodDto(DiscordMeSchema) {}
