/*
  Warnings:

  - You are about to drop the `occurrences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "occurrences";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "riskSituation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "risk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "riskSituationId" INTEGER NOT NULL,
    "cause" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "panicFunctionId" TEXT,
    "riskAlertId" TEXT,
    CONSTRAINT "risk_riskSituationId_fkey" FOREIGN KEY ("riskSituationId") REFERENCES "riskSituation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "risk_panicFunctionId_fkey" FOREIGN KEY ("panicFunctionId") REFERENCES "panicFunction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "risk_riskAlertId_fkey" FOREIGN KEY ("riskAlertId") REFERENCES "RiskAlert" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "donationList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "wasDonated" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "donation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "donationListId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "measure" TEXT NOT NULL,
    CONSTRAINT "donation_donationListId_fkey" FOREIGN KEY ("donationListId") REFERENCES "donationList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "measure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "panicFunction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "concluded" BOOLEAN NOT NULL,
    "riskAlertId" TEXT,
    CONSTRAINT "panicFunction_riskAlertId_fkey" FOREIGN KEY ("riskAlertId") REFERENCES "RiskAlert" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RiskAlert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "triggerCount" INTEGER NOT NULL,
    "triggeredAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "twitterPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "riskAlertId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
