/*
  Warnings:

  - The values [USER] on the enum `reviewableType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "reviewableType_new" AS ENUM ('MENUITEM', 'RESTAURANT');
ALTER TABLE "Review" ALTER COLUMN "reviewableType" TYPE "reviewableType_new" USING ("reviewableType"::text::"reviewableType_new");
ALTER TYPE "reviewableType" RENAME TO "reviewableType_old";
ALTER TYPE "reviewableType_new" RENAME TO "reviewableType";
DROP TYPE "reviewableType_old";
COMMIT;
