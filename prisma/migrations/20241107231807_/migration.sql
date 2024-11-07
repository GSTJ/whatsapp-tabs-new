/*
  Warnings:

  - Added the required column `status` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'FAILED');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "status" "MessageStatus" NOT NULL;
