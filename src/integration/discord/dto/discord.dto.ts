import { createZodDto } from 'nestjs-zod';
import {
  DiscordIntegrationSchema,
  DiscordMeSchema,
  DiscordAccessTokenSchema,
} from '../schema/discord.schema';

export class CreateDiscordDto extends createZodDto(DiscordIntegrationSchema) {}

export class UpdateDiscordDto extends createZodDto(
  DiscordIntegrationSchema.partial(),
) {}

export class DiscordMeResponseDto extends createZodDto(DiscordMeSchema) {}

export class DiscordAccessTokenDto extends createZodDto(
  DiscordAccessTokenSchema,
) {}
