/*
  Warnings:

  - You are about to drop the `RiskAlert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `address` on the `donationList` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `donationList` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `donationList` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `donationList` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `panicFunction` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `panicFunction` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `panicFunction` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `panicFunction` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `panicFunction` table. All the data in the column will be lost.
  - Added the required column `userId` to the `donationList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `panicFunction` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RiskAlert";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "riskAlert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "triggerCount" INTEGER NOT NULL,
    "triggeredAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_donationList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "wasDonated" BOOLEAN NOT NULL,
    CONSTRAINT "donationList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_donationList" ("id", "wasDonated") SELECT "id", "wasDonated" FROM "donationList";
DROP TABLE "donationList";
ALTER TABLE "new_donationList" RENAME TO "donationList";
CREATE TABLE "new_panicFunction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "concluded" BOOLEAN NOT NULL,
    "riskAlertId" TEXT,
    CONSTRAINT "panicFunction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "panicFunction_riskAlertId_fkey" FOREIGN KEY ("riskAlertId") REFERENCES "riskAlert" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_panicFunction" ("concluded", "date", "id", "riskAlertId") SELECT "concluded", "date", "id", "riskAlertId" FROM "panicFunction";
DROP TABLE "panicFunction";
ALTER TABLE "new_panicFunction" RENAME TO "panicFunction";
CREATE TABLE "new_risk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "riskSituationId" INTEGER NOT NULL,
    "cause" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "panicFunctionId" TEXT,
    "riskAlertId" TEXT,
    CONSTRAINT "risk_riskSituationId_fkey" FOREIGN KEY ("riskSituationId") REFERENCES "riskSituation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "risk_panicFunctionId_fkey" FOREIGN KEY ("panicFunctionId") REFERENCES "panicFunction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "risk_riskAlertId_fkey" FOREIGN KEY ("riskAlertId") REFERENCES "riskAlert" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_risk" ("cause", "id", "panicFunctionId", "riskAlertId", "riskSituationId", "solution") SELECT "cause", "id", "panicFunctionId", "riskAlertId", "riskSituationId", "solution" FROM "risk";
DROP TABLE "risk";
ALTER TABLE "new_risk" RENAME TO "risk";
CREATE TABLE "new_twitterPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "riskAlertId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "twitterPost_riskAlertId_fkey" FOREIGN KEY ("riskAlertId") REFERENCES "riskAlert" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_twitterPost" ("content", "date", "id", "riskAlertId") SELECT "content", "date", "id", "riskAlertId" FROM "twitterPost";
DROP TABLE "twitterPost";
ALTER TABLE "new_twitterPost" RENAME TO "twitterPost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
