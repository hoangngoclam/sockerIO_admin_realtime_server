-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "socker_id" TEXT NOT NULL,
    "name" TEXT,
    "Message" TEXT,
    "is_running" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_socker_id_key" ON "Client"("socker_id");
