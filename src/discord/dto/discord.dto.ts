import { createZodDto } from 'nestjs-zod';
import {
  DiscordIntegrationSchema,
  DiscordMeSchema,
  DiscordTokenSchema,
} from '../schema/discord.schema';

export class CreateDiscordDto extends createZodDto(DiscordIntegrationSchema) {}

export class UpdateDiscordDto extends createZodDto(
  DiscordIntegrationSchema.partial(),
) {}

export class DiscordMeResponseDto extends createZodDto(DiscordMeSchema) {}

export class DiscordTokenDto extends createZodDto(DiscordTokenSchema) {}
