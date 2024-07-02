/*
  Warnings:

  - You are about to drop the column `userNotificationPreference` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userNotificationPreference",
ADD COLUMN     "notificationPreferences" "NotificationsPreference"[];
