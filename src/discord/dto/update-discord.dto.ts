import { createZodDto } from 'nestjs-zod';
import { DiscordIntegrationSchema } from '../schema/discord.schema';

export class UpdateDiscordDto extends createZodDto(
  DiscordIntegrationSchema.partial(),
) {}
