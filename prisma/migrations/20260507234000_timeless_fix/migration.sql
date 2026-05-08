/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `EmailVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailVerification_code_key" ON "EmailVerification"("code");
