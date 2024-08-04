/*
  Warnings:

  - You are about to drop the column `userId` on the `panicFunction` table. All the data in the column will be lost.
  - You are about to drop the column `panicFunctionId` on the `risk` table. All the data in the column will be lost.
  - You are about to drop the column `riskAlertId` on the `risk` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `riskSituation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `donationList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `panicFunction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeRisk` to the `panicFunction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeRisk` to the `riskAlert` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_donationList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wasDonated" BOOLEAN NOT NULL,
    CONSTRAINT "donationList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_donationList" ("id", "userId", "wasDonated") SELECT "id", "userId", "wasDonated" FROM "donationList";
DROP TABLE "donationList";
ALTER TABLE "new_donationList" RENAME TO "donationList";
CREATE TABLE "new_panicFunction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "typeRisk" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "concluded" BOOLEAN NOT NULL,
    "riskAlertId" TEXT,
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
    CONSTRAINT "risk_riskSituationId_fkey" FOREIGN KEY ("riskSituationId") REFERENCES "riskSituation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_risk" ("cause", "id", "riskSituationId", "solution") SELECT "cause", "id", "riskSituationId", "solution" FROM "risk";
DROP TABLE "risk";
ALTER TABLE "new_risk" RENAME TO "risk";
CREATE TABLE "new_riskAlert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "typeRisk" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "triggerCount" INTEGER NOT NULL,
    "triggeredAt" DATETIME NOT NULL
);
INSERT INTO "new_riskAlert" ("city", "id", "triggerCount", "triggeredAt") SELECT "city", "id", "triggerCount", "triggeredAt" FROM "riskAlert";
DROP TABLE "riskAlert";
ALTER TABLE "new_riskAlert" RENAME TO "riskAlert";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "riskSituation_type_key" ON "riskSituation"("type");
