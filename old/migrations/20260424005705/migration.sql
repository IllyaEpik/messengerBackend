/*
  Warnings:

  - You are about to drop the column `albumId` on the `Topic` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Topic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isBasic" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Topic" ("id", "isBasic", "name") SELECT "id", "isBasic", "name" FROM "Topic";
DROP TABLE "Topic";
ALTER TABLE "new_Topic" RENAME TO "Topic";
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
