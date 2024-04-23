-- AlterTable
ALTER TABLE "MedService" ADD COLUMN     "numberOfPricing" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "UserMedServies" (
    "userId" INTEGER NOT NULL,
    "medServcieId" INTEGER NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMedServies_pkey" PRIMARY KEY ("userId","medServcieId")
);

-- AddForeignKey
ALTER TABLE "UserMedServies" ADD CONSTRAINT "UserMedServies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
