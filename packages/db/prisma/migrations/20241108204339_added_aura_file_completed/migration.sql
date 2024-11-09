-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "file" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aura" INTEGER NOT NULL DEFAULT 0;
