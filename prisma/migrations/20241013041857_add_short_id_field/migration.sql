/*
  Warnings:

  - Added the required column `shortId` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "shortId" TEXT NOT NULL;
