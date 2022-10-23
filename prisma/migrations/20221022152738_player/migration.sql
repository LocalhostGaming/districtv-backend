/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Citizen` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `Citizen` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Citizen` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[citizenId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[positionId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[statsId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PLAYER');

-- DropForeignKey
ALTER TABLE "Citizen" DROP CONSTRAINT "Citizen_playerId_fkey";

-- DropIndex
DROP INDEX "Citizen_playerId_key";

-- AlterTable
ALTER TABLE "Citizen" DROP COLUMN "createdAt",
DROP COLUMN "playerId",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "citizenId" TEXT,
ADD COLUMN     "positionId" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PLAYER',
ADD COLUMN     "statsId" TEXT;

-- CreateTable
CREATE TABLE "PlayerPosition" (
    "id" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "z" INTEGER NOT NULL,
    "heading" INTEGER NOT NULL,

    CONSTRAINT "PlayerPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL,
    "health" INTEGER NOT NULL DEFAULT 100,
    "hunger" INTEGER NOT NULL DEFAULT 100,
    "thirst" INTEGER NOT NULL DEFAULT 100,
    "armor" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_citizenId_key" ON "Player"("citizenId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_positionId_key" ON "Player"("positionId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_statsId_key" ON "Player"("statsId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "Citizen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "PlayerPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "PlayerStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;
