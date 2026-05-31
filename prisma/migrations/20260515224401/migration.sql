/*
  Warnings:

  - You are about to drop the `_ProfileFriends` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[from_user_id,to_user_id]` on the table `FriendsRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProfileFriends";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "FriendsRequest_from_user_id_to_user_id_key" ON "FriendsRequest"("from_user_id", "to_user_id");
