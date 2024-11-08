/*
  Warnings:

  - You are about to drop the column `type` on the `Message` table. All the data in the column will be lost.
  - Added the required column `mediaType` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "type",
ADD COLUMN     "mediaType" TEXT NOT NULL,
ADD COLUMN     "mediaUrl" TEXT;
