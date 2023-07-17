-- CreateTable
CREATE TABLE "CalendarEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT,
    "reminder" BOOLEAN NOT NULL,
    "flatId" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "CalendarEvent_flatId_date_idx" ON "CalendarEvent"("flatId", "date");
