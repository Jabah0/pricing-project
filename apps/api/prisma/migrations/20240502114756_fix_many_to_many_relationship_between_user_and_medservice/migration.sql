/*
  Warnings:

  - You are about to drop the `_MedServiceToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MedServiceToUser" DROP CONSTRAINT "_MedServiceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MedServiceToUser" DROP CONSTRAINT "_MedServiceToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullName" TEXT NOT NULL;

-- DropTable
DROP TABLE "_MedServiceToUser";

-- CreateTable
CREATE TABLE "UserMedServices" (
    "medServiceId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "UserMedServices_pkey" PRIMARY KEY ("medServiceId","userId")
);

-- AddForeignKey
ALTER TABLE "UserMedServices" ADD CONSTRAINT "UserMedServices_medServiceId_fkey" FOREIGN KEY ("medServiceId") REFERENCES "MedService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedServices" ADD CONSTRAINT "UserMedServices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
