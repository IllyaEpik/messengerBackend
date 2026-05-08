/*
  Warnings:

  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "birth_date" DATETIME,
    "signature" TEXT,
    "avatar" TEXT NOT NULL,
    "pseudonym" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "is_image_singnature" BOOLEAN NOT NULL DEFAULT false,
    "is_text_signature" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("avatar", "birth_date", "id", "is_image_singnature", "is_text_signature", "pseudonym", "signature", "userId") SELECT "avatar", "birth_date", "id", "is_image_singnature", "is_text_signature", "pseudonym", "signature", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
