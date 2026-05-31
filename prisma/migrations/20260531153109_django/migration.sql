/*
  Warnings:

  - You are about to drop the `_MessageReaders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chat_app_messageImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_app_postImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile_app_albumImage` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `EmailVerification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `EmailVerification` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `EmailVerification` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `chat_app_chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminId` on the `chat_app_chat` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `chat_app_chat` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `chat_app_chat_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatId` on the `chat_app_chat_users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `chat_app_chat_users` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `chat_app_chat_users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `chat_app_message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatId` on the `chat_app_message` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `chat_app_message` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `chat_app_message` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `post_app_post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `post_app_post` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `post_app_post` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `post_app_postheart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `post_app_postheart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post_app_postheart` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `post_app_postheart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `post_app_postlike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `post_app_postlike` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post_app_postlike` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `post_app_postlike` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `post_app_postlink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `post_app_postlink` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `post_app_postlink` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `post_app_postview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `post_app_postview` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post_app_postview` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `post_app_postview` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `post_app_tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `post_app_tag` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `profile_app_album` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `profile_app_album` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `profile_app_album` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `profile_app_profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is_image_singnature` on the `profile_app_profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `profile_app_profile` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `profile_app_profile` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `user_app_friendship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `from_user_id` on the `user_app_friendship` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `id` on the `user_app_friendship` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `to_user_id` on the `user_app_friendship` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `user_app_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user_app_user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - Added the required column `user_id` to the `EmailVerification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `chat_app_chat_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `chat_app_chat_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `chat_app_message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `post_app_post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_app_postheart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `post_app_postheart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_app_postlike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `post_app_postlike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_app_postlink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_app_postview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `post_app_postview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `profile_app_album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_image_signature` to the `profile_app_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_joined` to the `user_app_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `user_app_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `user_app_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_staff` to the `user_app_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_superuser` to the `user_app_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user_app_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_MessageReaders_B_index";

-- DropIndex
DROP INDEX "_MessageReaders_AB_unique";

-- DropIndex
DROP INDEX "_PostTags_B_index";

-- DropIndex
DROP INDEX "_PostTags_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MessageReaders";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PostTags";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "chat_app_messageImage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "post_app_postImage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "profile_app_albumImage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "auth_group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "auth_group_permissions" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "group_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    CONSTRAINT "auth_group_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "auth_group_permissions_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "auth_permission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content_type_id" INTEGER NOT NULL,
    "codename" TEXT NOT NULL,
    CONSTRAINT "auth_permission_content_type_id_fkey" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "chat_app_message_readers" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "message_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    CONSTRAINT "chat_app_message_readers_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_app_message" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "chat_app_message_readers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "chat_app_messageimage" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "message_id" BIGINT NOT NULL,
    CONSTRAINT "chat_app_messageimage_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_app_message" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "django_admin_log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "action_time" DATETIME NOT NULL,
    "object_id" TEXT,
    "object_repr" TEXT NOT NULL,
    "action_flag" INTEGER NOT NULL,
    "change_message" TEXT NOT NULL,
    "content_type_id" INTEGER,
    "user_id" BIGINT NOT NULL,
    CONSTRAINT "django_admin_log_content_type_id_fkey" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "django_admin_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "django_content_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "app_label" TEXT NOT NULL,
    "model" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "django_migrations" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "app" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "applied" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "django_session" (
    "session_key" TEXT NOT NULL PRIMARY KEY,
    "session_data" TEXT NOT NULL,
    "expire_date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "user_app_user_groups" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "group_id" INTEGER NOT NULL,
    CONSTRAINT "user_app_user_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "user_app_user_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "user_app_user_user_permissions" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "permission_id" INTEGER NOT NULL,
    CONSTRAINT "user_app_user_user_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "user_app_user_user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "post_app_post_tags" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "post_id" BIGINT NOT NULL,
    "tag_id" BIGINT NOT NULL,
    CONSTRAINT "post_app_post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post_app_post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "post_app_post_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "post_app_tag" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "post_app_postimage" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "post_id" BIGINT NOT NULL,
    "compressed_image" TEXT NOT NULL,
    "original_image" TEXT NOT NULL,
    CONSTRAINT "post_app_postimage_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post_app_post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "profile_app_albumimage" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "is_shown" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL,
    "album_id" BIGINT NOT NULL,
    CONSTRAINT "profile_app_albumimage_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "profile_app_album" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmailVerification" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "new_email" TEXT,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "user_id" BIGINT NOT NULL,
    CONSTRAINT "EmailVerification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EmailVerification" ("code", "expiresAt", "id", "new_email") SELECT "code", "expiresAt", "id", "new_email" FROM "EmailVerification";
DROP TABLE "EmailVerification";
ALTER TABLE "new_EmailVerification" RENAME TO "EmailVerification";
CREATE UNIQUE INDEX "EmailVerification_new_email_key" ON "EmailVerification"("new_email");
CREATE UNIQUE INDEX "EmailVerification_code_key" ON "EmailVerification"("code");
CREATE UNIQUE INDEX "EmailVerification_user_id_key" ON "EmailVerification"("user_id");
CREATE TABLE "new_chat_app_chat" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "is_group" BOOLEAN NOT NULL,
    "avatar" TEXT,
    "admin_id" BIGINT,
    CONSTRAINT "chat_app_chat_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_chat_app_chat" ("avatar", "id", "is_group", "name") SELECT "avatar", "id", "is_group", "name" FROM "chat_app_chat";
DROP TABLE "chat_app_chat";
ALTER TABLE "new_chat_app_chat" RENAME TO "chat_app_chat";
CREATE INDEX "chat_app_chat_admin_id_f1deddb9" ON "chat_app_chat"("admin_id");
CREATE TABLE "new_chat_app_chat_users" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "chat_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    CONSTRAINT "chat_app_chat_users_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat_app_chat" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "chat_app_chat_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_chat_app_chat_users" ("id") SELECT "id" FROM "chat_app_chat_users";
DROP TABLE "chat_app_chat_users";
ALTER TABLE "new_chat_app_chat_users" RENAME TO "chat_app_chat_users";
CREATE INDEX "chat_app_chat_users_chat_id_5bba5169" ON "chat_app_chat_users"("chat_id");
CREATE INDEX "chat_app_chat_users_user_id_7aff58dc" ON "chat_app_chat_users"("user_id");
CREATE UNIQUE INDEX "chat_app_chat_users_chat_id_user_id_b05bfe90_uniq" ON "chat_app_chat_users"("chat_id", "user_id");
CREATE TABLE "new_chat_app_message" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "text" TEXT,
    "created_at" DATETIME NOT NULL,
    "chat_id" BIGINT NOT NULL,
    "sender_id" BIGINT,
    CONSTRAINT "chat_app_message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat_app_chat" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "chat_app_message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_chat_app_message" ("created_at", "id", "text") SELECT "created_at", "id", "text" FROM "chat_app_message";
DROP TABLE "chat_app_message";
ALTER TABLE "new_chat_app_message" RENAME TO "chat_app_message";
CREATE INDEX "chat_app_message_chat_id_a7824698" ON "chat_app_message"("chat_id");
CREATE INDEX "chat_app_message_sender_id_03c5fae9" ON "chat_app_message"("sender_id");
CREATE TABLE "new_post_app_post" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "topic" TEXT,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "author_id" BIGINT NOT NULL,
    "updated_at" DATETIME,
    CONSTRAINT "post_app_post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_post_app_post" ("content", "created_at", "id", "title", "topic", "updated_at") SELECT "content", "created_at", "id", "title", "topic", "updated_at" FROM "post_app_post";
DROP TABLE "post_app_post";
ALTER TABLE "new_post_app_post" RENAME TO "post_app_post";
CREATE INDEX "post_app_post_author_id_4cf2f14d" ON "post_app_post"("author_id");
CREATE TABLE "new_post_app_postheart" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "post_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    CONSTRAINT "post_app_postheart_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post_app_post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "post_app_postheart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_post_app_postheart" ("id") SELECT "id" FROM "post_app_postheart";
DROP TABLE "post_app_postheart";
ALTER TABLE "new_post_app_postheart" RENAME TO "post_app_postheart";
CREATE INDEX "post_app_postheart_post_id_556aaef5" ON "post_app_postheart"("post_id");
CREATE INDEX "post_app_postheart_user_id_e3112196" ON "post_app_postheart"("user_id");
CREATE UNIQUE INDEX "unique_post_hearts" ON "post_app_postheart"("user_id", "post_id");
CREATE TABLE "new_post_app_postlike" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "post_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    CONSTRAINT "post_app_postlike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post_app_post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "post_app_postlike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_post_app_postlike" ("id") SELECT "id" FROM "post_app_postlike";
DROP TABLE "post_app_postlike";
ALTER TABLE "new_post_app_postlike" RENAME TO "post_app_postlike";
CREATE INDEX "post_app_postlike_post_id_fe24b1be" ON "post_app_postlike"("post_id");
CREATE INDEX "post_app_postlike_user_id_12715559" ON "post_app_postlike"("user_id");
CREATE UNIQUE INDEX "unique_post_like" ON "post_app_postlike"("user_id", "post_id");
CREATE TABLE "new_post_app_postlink" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "post_id" BIGINT NOT NULL,
    CONSTRAINT "post_app_postlink_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post_app_post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_post_app_postlink" ("id", "url") SELECT "id", "url" FROM "post_app_postlink";
DROP TABLE "post_app_postlink";
ALTER TABLE "new_post_app_postlink" RENAME TO "post_app_postlink";
CREATE INDEX "post_app_postlink_post_id_38de8dee" ON "post_app_postlink"("post_id");
CREATE TABLE "new_post_app_postview" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "post_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    CONSTRAINT "post_app_postview_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post_app_post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "post_app_postview_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_post_app_postview" ("id") SELECT "id" FROM "post_app_postview";
DROP TABLE "post_app_postview";
ALTER TABLE "new_post_app_postview" RENAME TO "post_app_postview";
CREATE INDEX "post_app_postview_post_id_bfaa8cff" ON "post_app_postview"("post_id");
CREATE INDEX "post_app_postview_user_id_3e80c157" ON "post_app_postview"("user_id");
CREATE UNIQUE INDEX "unique_post_view" ON "post_app_postview"("user_id", "post_id");
CREATE TABLE "new_post_app_tag" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_post_app_tag" ("id", "name") SELECT "id", "name" FROM "post_app_tag";
DROP TABLE "post_app_tag";
ALTER TABLE "new_post_app_tag" RENAME TO "post_app_tag";
CREATE TABLE "new_profile_app_album" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "theme" TEXT,
    "year" INTEGER,
    "is_shown" BOOLEAN NOT NULL,
    "is_default" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL,
    "profile_id" BIGINT NOT NULL,
    CONSTRAINT "profile_app_album_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile_app_profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_profile_app_album" ("created_at", "id", "is_default", "is_shown", "name", "theme", "year") SELECT "created_at", "id", "is_default", "is_shown", "name", "theme", "year" FROM "profile_app_album";
DROP TABLE "profile_app_album";
ALTER TABLE "new_profile_app_album" RENAME TO "profile_app_album";
CREATE INDEX "profile_app_album_profile_id_7414a460" ON "profile_app_album"("profile_id");
CREATE TABLE "new_profile_app_profile" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "birth_date" DATETIME,
    "signature" TEXT,
    "avatar" TEXT,
    "pseudonym" TEXT,
    "is_text_signature" BOOLEAN NOT NULL,
    "is_image_signature" BOOLEAN NOT NULL,
    "user_id" BIGINT,
    CONSTRAINT "profile_app_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_app_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_profile_app_profile" ("avatar", "birth_date", "id", "is_text_signature", "pseudonym", "signature") SELECT "avatar", "birth_date", "id", "is_text_signature", "pseudonym", "signature" FROM "profile_app_profile";
DROP TABLE "profile_app_profile";
ALTER TABLE "new_profile_app_profile" RENAME TO "profile_app_profile";
CREATE UNIQUE INDEX "profile_app_profile_user_id_key" ON "profile_app_profile"("user_id");
CREATE TABLE "new_user_app_friendship" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
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
CREATE TABLE "new_user_app_user" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "last_login" DATETIME,
    "is_superuser" BOOLEAN NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "is_staff" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "date_joined" DATETIME NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL
);
INSERT INTO "new_user_app_user" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "user_app_user";
DROP TABLE "user_app_user";
ALTER TABLE "new_user_app_user" RENAME TO "user_app_user";
CREATE UNIQUE INDEX "user_app_user_username_e45e0961_uniq" ON "user_app_user"("username");
CREATE UNIQUE INDEX "user_app_user_email_key" ON "user_app_user"("email");
CREATE INDEX "user_app_user_email_e59b5739_like" ON "user_app_user"("email");
CREATE INDEX "user_app_user_username_e45e0961_like" ON "user_app_user"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "auth_group_name_key" ON "auth_group"("name");

-- CreateIndex
CREATE INDEX "auth_group_name_a6ea08ec_like" ON "auth_group"("name");

-- CreateIndex
CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions"("group_id");

-- CreateIndex
CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions"("group_id", "permission_id");

-- CreateIndex
CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission"("content_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission"("content_type_id", "codename");

-- CreateIndex
CREATE INDEX "chat_app_message_readers_message_id_adafa038" ON "chat_app_message_readers"("message_id");

-- CreateIndex
CREATE INDEX "chat_app_message_readers_user_id_11fb5647" ON "chat_app_message_readers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_app_message_readers_message_id_user_id_dfa7b323_uniq" ON "chat_app_message_readers"("message_id", "user_id");

-- CreateIndex
CREATE INDEX "chat_app_messageimage_message_id_7967b5cb" ON "chat_app_messageimage"("message_id");

-- CreateIndex
CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log"("content_type_id");

-- CreateIndex
CREATE INDEX "django_admin_log_user_id_c564eba6" ON "django_admin_log"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type"("app_label", "model");

-- CreateIndex
CREATE INDEX "django_session_expire_date_a5c62663" ON "django_session"("expire_date");

-- CreateIndex
CREATE INDEX "django_session_session_key_c0390e0f_like" ON "django_session"("session_key");

-- CreateIndex
CREATE INDEX "user_app_user_groups_group_id_77b237a8" ON "user_app_user_groups"("group_id");

-- CreateIndex
CREATE INDEX "user_app_user_groups_user_id_9ac3bba9" ON "user_app_user_groups"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_app_user_groups_user_id_group_id_13ac6bde_uniq" ON "user_app_user_groups"("user_id", "group_id");

-- CreateIndex
CREATE INDEX "user_app_user_user_permissions_permission_id_66c16b85" ON "user_app_user_user_permissions"("permission_id");

-- CreateIndex
CREATE INDEX "user_app_user_user_permissions_user_id_6099c7a4" ON "user_app_user_user_permissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_app_user_user_permi_user_id_permission_id_46c11fb3_uniq" ON "user_app_user_user_permissions"("user_id", "permission_id");

-- CreateIndex
CREATE INDEX "post_app_post_tags_post_id_b72298ea" ON "post_app_post_tags"("post_id");

-- CreateIndex
CREATE INDEX "post_app_post_tags_tag_id_df0ee56c" ON "post_app_post_tags"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_app_post_tags_post_id_tag_id_f9d7c733_uniq" ON "post_app_post_tags"("post_id", "tag_id");

-- CreateIndex
CREATE INDEX "post_app_postimage_post_id_f96e8718" ON "post_app_postimage"("post_id");

-- CreateIndex
CREATE INDEX "profile_app_albumimage_album_id_9736c867" ON "profile_app_albumimage"("album_id");
