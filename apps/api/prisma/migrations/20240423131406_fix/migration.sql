/*
  Warnings:

  - You are about to drop the column `createDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createDate",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
