/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `SessionCode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `SessionCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SessionCode_userId_key" ON "SessionCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionCode_discordId_key" ON "SessionCode"("discordId");
