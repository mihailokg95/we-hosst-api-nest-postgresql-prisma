/*
  Warnings:

  - Added the required column `city` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_employerId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "managers" TEXT[];

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "employerName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "category" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "concept" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "kitchenConcept" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "managers" TEXT[],
ADD COLUMN     "numberOfEmployees" TEXT,
ADD COLUMN     "zip" TEXT NOT NULL,
ALTER COLUMN "employerName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
