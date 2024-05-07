/*
  Warnings:

  - You are about to drop the column `pib` on the `Company` table. All the data in the column will be lost.
  - Added the required column `crn` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vat` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "pib",
ADD COLUMN     "crn" TEXT NOT NULL,
ADD COLUMN     "vat" TEXT NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastName" DROP NOT NULL;
