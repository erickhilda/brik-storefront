/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Product_Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product_Category" ADD COLUMN     "path" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_Category_path_key" ON "Product_Category"("path");
