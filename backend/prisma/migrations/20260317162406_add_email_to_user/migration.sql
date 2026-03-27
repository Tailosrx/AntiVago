-- AlterTable
ALTER TABLE "AnimeEntry" ADD COLUMN     "photo" TEXT;

-- CreateIndex
CREATE INDEX "Achievement_category_idx" ON "Achievement"("category");

-- CreateIndex
CREATE INDEX "GameEntry_category_idx" ON "GameEntry"("category");

-- CreateIndex
CREATE INDEX "ReadingEntry_category_idx" ON "ReadingEntry"("category");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
