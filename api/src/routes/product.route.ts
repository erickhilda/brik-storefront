import express from "express";
import ProductController from "../controllers/product";

const router = express.Router();

router.route("/").get(ProductController.getAll);
router.route("/:id").get(ProductController.getById);
router.route("/category/:id").get(ProductController.getByCategory);

export default router;
