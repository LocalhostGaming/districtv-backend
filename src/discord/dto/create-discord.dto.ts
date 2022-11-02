import { createZodDto } from 'nestjs-zod';
import { DiscordIntegrationSchema } from '../schema/discord.schema';

export class CreateDiscordDto extends createZodDto(DiscordIntegrationSchema) {}
