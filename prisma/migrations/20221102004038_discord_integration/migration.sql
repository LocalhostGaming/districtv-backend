-- CreateTable
CREATE TABLE "DiscordIntegration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "DiscordIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordIntegration_userId_key" ON "DiscordIntegration"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordIntegration_username_key" ON "DiscordIntegration"("username");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordIntegration_discriminator_key" ON "DiscordIntegration"("discriminator");

-- AddForeignKey
ALTER TABLE "DiscordIntegration" ADD CONSTRAINT "DiscordIntegration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
