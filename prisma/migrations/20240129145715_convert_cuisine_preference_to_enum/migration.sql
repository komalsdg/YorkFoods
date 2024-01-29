/*
  Warnings:

  - The `cuisinePreference` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Cuisine" AS ENUM ('ITALIAN', 'MEXICAN', 'CHINESE', 'JAPANESE', 'INDIAN', 'AMERICAN', 'FRENCH', 'KOREAN', 'BRITISH', 'MEDITERRANEAN', 'CARIBBEAN', 'CONTINENTAL', 'null');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cuisinePreference",
ADD COLUMN     "cuisinePreference" "Cuisine" DEFAULT 'null';
