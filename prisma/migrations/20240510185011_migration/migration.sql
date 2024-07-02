/*
  Warnings:

  - You are about to drop the column `pib` on the `Location` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationsPreference" AS ENUM ('EMAIL', 'SMS', 'PUSH');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "socialNetworks" TEXT[];

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "pib",
ADD COLUMN     "socialNetworks" TEXT[],
ADD COLUMN     "vat" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userNotificationPreference" "NotificationsPreference"[];
