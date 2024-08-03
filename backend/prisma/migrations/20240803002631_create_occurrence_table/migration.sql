-- CreateTable
CREATE TABLE "occurrences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "city" TEXT NOT NULL
);
