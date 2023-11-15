import express from "express";
import ProductCategoryController from "../controllers/product-category";

const router = express.Router();

router.route("/").get(ProductCategoryController.getAll);

export default router;
