/*
  Warnings:

  - A unique constraint covering the columns `[name,category_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,path]` on the table `Product_Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Product_name_category_id_idx" ON "Product"("name", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_category_id_key" ON "Product"("name", "category_id");

-- CreateIndex
CREATE INDEX "Product_Category_name_path_idx" ON "Product_Category"("name", "path");

-- CreateIndex
CREATE UNIQUE INDEX "Product_Category_name_path_key" ON "Product_Category"("name", "path");
