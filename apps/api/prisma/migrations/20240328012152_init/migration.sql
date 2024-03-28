-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL,
    "hashRefreshToken" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedService" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dalilName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "nationalCode" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unitSize" INTEGER NOT NULL,

    CONSTRAINT "MedService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
