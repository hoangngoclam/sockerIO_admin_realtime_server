/*
  Warnings:

  - You are about to drop the column `Message` on the `Client` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "socker_id" TEXT NOT NULL,
    "name" TEXT,
    "message" TEXT,
    "is_running" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Client" ("id", "is_running", "name", "socker_id") SELECT "id", "is_running", "name", "socker_id" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_socker_id_key" ON "Client"("socker_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
