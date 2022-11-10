/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `DiscordIntegration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `DiscordIntegration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discordId` to the `DiscordIntegration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `DiscordIntegration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordIntegration" ADD COLUMN     "discordId" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DiscordIntegration_discordId_key" ON "DiscordIntegration"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordIntegration_email_key" ON "DiscordIntegration"("email");
