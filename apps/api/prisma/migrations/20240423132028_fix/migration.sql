/*
  Warnings:

  - You are about to drop the column `createdDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdDate",
DROP COLUMN "updateDate",
ADD COLUMN     "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL;
