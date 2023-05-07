/*
  Warnings:

  - You are about to drop the column `socker_id` on the `Client` table. All the data in the column will be lost.
  - Added the required column `socket_id` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "socket_id" TEXT NOT NULL,
    "name" TEXT,
    "message" TEXT,
    "is_running" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Client" ("id", "is_running", "message", "name") SELECT "id", "is_running", "message", "name" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_socket_id_key" ON "Client"("socket_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
