/*
  Warnings:

  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AlbumImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FriendsRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostHeart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "FriendsRequest_from_user_id_to_user_id_key";

-- DropIndex
DROP INDEX "PostHeart_userId_postId_key";

-- DropIndex
DROP INDEX "PostLike_userId_postId_key";

-- DropIndex
DROP INDEX "PostView_userId_postId_key";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- DropIndex
DROP INDEX "Tag_name_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_username_key";

-- DropIndex
DROP INDEX "_ChatParticipants_B_index";

-- DropIndex
DROP INDEX "_ChatParticipants_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Album";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AlbumImage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Chat";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FriendsRequest";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Message";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MessageImage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PostHeart";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PostImage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PostLike";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PostLink";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PostView";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Profile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ChatParticipants";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "chat_app_chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "is_group" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT NOT NULL,
    "adminId" INTEGER,
    CONSTRAINT "chat_app_chat_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user_app_user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chat_app_message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" INTEGER NOT NULL,
    CONSTRAINT "chat_app_message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat_app_chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "chat_app_message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chat_app_messageImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "messageId" INTEGER NOT NULL,
    CONSTRAINT "chat_app_messageImage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "chat_app_message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chat_app_chat_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "chat_app_chat_users_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat_app_chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "chat_app_chat_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_app_tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "post_app_post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "topic" TEXT,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "post_app_post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_app_postImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "original_image" TEXT NOT NULL,
    "compressed_image" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "post_app_postImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post_app_post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_app_postlike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "post_app_postlike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "post_app_postlike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post_app_post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_app_postheart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "post_app_postheart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "post_app_postheart_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post_app_post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_app_postview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "post_app_postview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "post_app_postview_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post_app_post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_app_postlink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "post_app_postlink_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post_app_post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "profile_app_profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "birth_date" DATETIME,
    "signature" TEXT,
    "avatar" TEXT NOT NULL,
    "pseudonym" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "is_image_singnature" BOOLEAN NOT NULL DEFAULT false,
    "is_text_signature" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "profile_app_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "profile_app_album" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_shown" BOOLEAN NOT NULL DEFAULT true,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "profileId" INTEGER NOT NULL,
    CONSTRAINT "profile_app_album_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile_app_profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "profile_app_albumImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_shown" BOOLEAN NOT NULL DEFAULT true,
    "albumId" INTEGER NOT NULL,
    CONSTRAINT "profile_app_albumImage_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "profile_app_album" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_app_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_app_friendship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from_user_id" INTEGER NOT NULL,
    "to_user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "user_app_friendship_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_app_friendship_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmailVerification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "new_email" TEXT,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "EmailVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_app_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EmailVerification" ("code", "expiresAt", "id", "new_email", "userId") SELECT "code", "expiresAt", "id", "new_email", "userId" FROM "EmailVerification";
DROP TABLE "EmailVerification";
ALTER TABLE "new_EmailVerification" RENAME TO "EmailVerification";
CREATE UNIQUE INDEX "EmailVerification_new_email_key" ON "EmailVerification"("new_email");
CREATE UNIQUE INDEX "EmailVerification_code_key" ON "EmailVerification"("code");
CREATE UNIQUE INDEX "EmailVerification_userId_key" ON "EmailVerification"("userId");
CREATE TABLE "new__MessageReaders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MessageReaders_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_app_message" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MessageReaders_B_fkey" FOREIGN KEY ("B") REFERENCES "user_app_user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__MessageReaders" ("A", "B") SELECT "A", "B" FROM "_MessageReaders";
DROP TABLE "_MessageReaders";
ALTER TABLE "new__MessageReaders" RENAME TO "_MessageReaders";
CREATE UNIQUE INDEX "_MessageReaders_AB_unique" ON "_MessageReaders"("A", "B");
CREATE INDEX "_MessageReaders_B_index" ON "_MessageReaders"("B");
CREATE TABLE "new__PostTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostTags_A_fkey" FOREIGN KEY ("A") REFERENCES "post_app_post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostTags_B_fkey" FOREIGN KEY ("B") REFERENCES "post_app_tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__PostTags" ("A", "B") SELECT "A", "B" FROM "_PostTags";
DROP TABLE "_PostTags";
ALTER TABLE "new__PostTags" RENAME TO "_PostTags";
CREATE UNIQUE INDEX "_PostTags_AB_unique" ON "_PostTags"("A", "B");
CREATE INDEX "_PostTags_B_index" ON "_PostTags"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "chat_app_chat_users_chatId_userId_key" ON "chat_app_chat_users"("chatId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "post_app_tag_name_key" ON "post_app_tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "post_app_postlike_userId_postId_key" ON "post_app_postlike"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "post_app_postheart_userId_postId_key" ON "post_app_postheart"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "post_app_postview_userId_postId_key" ON "post_app_postview"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_app_profile_userId_key" ON "profile_app_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_app_user_username_key" ON "user_app_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_app_user_email_key" ON "user_app_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_app_friendship_from_user_id_to_user_id_key" ON "user_app_friendship"("from_user_id", "to_user_id");
