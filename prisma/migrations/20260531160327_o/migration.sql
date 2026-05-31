-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chat_app_message" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "text" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chat_id" BIGINT NOT NULL,
    "sender_id" BIGINT,
    CONSTRAINT "chat_app_message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat_app_chat" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "chat_app_message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_chat_app_message" ("chat_id", "created_at", "id", "sender_id", "text") SELECT "chat_id", "created_at", "id", "sender_id", "text" FROM "chat_app_message";
DROP TABLE "chat_app_message";
ALTER TABLE "new_chat_app_message" RENAME TO "chat_app_message";
CREATE INDEX "chat_app_message_chat_id_a7824698" ON "chat_app_message"("chat_id");
CREATE INDEX "chat_app_message_sender_id_03c5fae9" ON "chat_app_message"("sender_id");
CREATE TABLE "new_post_app_post" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "topic" TEXT,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" BIGINT NOT NULL,
    "updated_at" DATETIME,
    CONSTRAINT "post_app_post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_post_app_post" ("author_id", "content", "created_at", "id", "title", "topic", "updated_at") SELECT "author_id", "content", "created_at", "id", "title", "topic", "updated_at" FROM "post_app_post";
DROP TABLE "post_app_post";
ALTER TABLE "new_post_app_post" RENAME TO "post_app_post";
CREATE INDEX "post_app_post_author_id_4cf2f14d" ON "post_app_post"("author_id");
CREATE TABLE "new_profile_app_albumimage" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "is_shown" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "album_id" BIGINT NOT NULL,
    CONSTRAINT "profile_app_albumimage_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "profile_app_album" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_profile_app_albumimage" ("album_id", "created_at", "id", "image", "is_shown") SELECT "album_id", "created_at", "id", "image", "is_shown" FROM "profile_app_albumimage";
DROP TABLE "profile_app_albumimage";
ALTER TABLE "new_profile_app_albumimage" RENAME TO "profile_app_albumimage";
CREATE INDEX "profile_app_albumimage_album_id_9736c867" ON "profile_app_albumimage"("album_id");
CREATE TABLE "new_user_app_friendship" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from_user_id" BIGINT NOT NULL,
    "to_user_id" BIGINT NOT NULL,
    CONSTRAINT "user_app_friendship_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_app_friendship_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_app_friendship" ("created_at", "from_user_id", "id", "status", "to_user_id") SELECT "created_at", "from_user_id", "id", "status", "to_user_id" FROM "user_app_friendship";
DROP TABLE "user_app_friendship";
ALTER TABLE "new_user_app_friendship" RENAME TO "user_app_friendship";
CREATE INDEX "user_app_friendship_from_user_id_e1d46b12" ON "user_app_friendship"("from_user_id");
CREATE INDEX "user_app_friendship_to_user_id_f5d68c80" ON "user_app_friendship"("to_user_id");
CREATE UNIQUE INDEX "user_app_friendship_from_user_id_to_user_id_1917f941_uniq" ON "user_app_friendship"("from_user_id", "to_user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
