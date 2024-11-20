/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedAt` on the `Document` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docOrigin` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docType` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentName` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emitter` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liquidValue` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "docOrigin" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "emitter" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "liquidValue" REAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Document" ("createdAt", "id") SELECT "createdAt", "id" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE UNIQUE INDEX "Document_code_key" ON "Document"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
