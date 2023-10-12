/*
  Warnings:

  - You are about to drop the column `date` on the `CalendarEvent` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `CalendarEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `CalendarEvent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CalendarEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "description" TEXT,
    "reminder" BOOLEAN NOT NULL,
    "flatId" TEXT NOT NULL,
    "authorId" TEXT,
    CONSTRAINT "CalendarEvent_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CalendarEvent" ("description", "flatId", "id", "reminder", "title") SELECT "description", "flatId", "id", "reminder", "title" FROM "CalendarEvent";
DROP TABLE "CalendarEvent";
ALTER TABLE "new_CalendarEvent" RENAME TO "CalendarEvent";
CREATE INDEX "CalendarEvent_flatId_startDate_endDate_idx" ON "CalendarEvent"("flatId", "startDate", "endDate");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
