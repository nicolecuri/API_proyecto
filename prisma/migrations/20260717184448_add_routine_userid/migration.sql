-- AlterTable
ALTER TABLE "Routine" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "Routine_userId_idx" ON "Routine"("userId");
