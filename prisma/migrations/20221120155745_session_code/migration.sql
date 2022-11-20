/*
  Warnings:

  - You are about to drop the `TemporaryCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TemporaryCode";

-- CreateTable
CREATE TABLE "SessionCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionCode_code_key" ON "SessionCode"("code");
