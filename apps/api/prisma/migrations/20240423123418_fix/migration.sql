/*
  Warnings:

  - You are about to drop the `UserMedServies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserMedServies" DROP CONSTRAINT "UserMedServies_userId_fkey";

-- DropTable
DROP TABLE "UserMedServies";

-- CreateTable
CREATE TABLE "_MedServiceToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MedServiceToUser_AB_unique" ON "_MedServiceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MedServiceToUser_B_index" ON "_MedServiceToUser"("B");

-- AddForeignKey
ALTER TABLE "_MedServiceToUser" ADD CONSTRAINT "_MedServiceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "MedService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedServiceToUser" ADD CONSTRAINT "_MedServiceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
