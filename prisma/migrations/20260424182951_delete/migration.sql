-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AlbumPhoto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photo" TEXT NOT NULL,
    "crackedPhoto" TEXT,
    "visible" BOOLEAN NOT NULL,
    "albumId" INTEGER NOT NULL,
    CONSTRAINT "AlbumPhoto_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AlbumPhoto" ("albumId", "crackedPhoto", "id", "photo", "visible") SELECT "albumId", "crackedPhoto", "id", "photo", "visible" FROM "AlbumPhoto";
DROP TABLE "AlbumPhoto";
ALTER TABLE "new_AlbumPhoto" RENAME TO "AlbumPhoto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
