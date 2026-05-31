/*
  Warnings:

  - You are about to drop the column `fromProfileId` on the `FriendsRequest` table. All the data in the column will be lost.
  - You are about to drop the column `toProfileId` on the `FriendsRequest` table. All the data in the column will be lost.
  - Added the required column `from_user_id` to the `FriendsRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_user_id` to the `FriendsRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FriendsRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from_user_id" INTEGER NOT NULL,
    "to_user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "FriendsRequest_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FriendsRequest_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FriendsRequest" ("created_at", "id", "status") SELECT "created_at", "id", "status" FROM "FriendsRequest";
DROP TABLE "FriendsRequest";
ALTER TABLE "new_FriendsRequest" RENAME TO "FriendsRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
