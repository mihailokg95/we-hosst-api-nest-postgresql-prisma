-- AlterTable
ALTER TABLE "_ApplicationsApplicant" ADD CONSTRAINT "_ApplicationsApplicant_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ApplicationsApplicant_AB_unique";
