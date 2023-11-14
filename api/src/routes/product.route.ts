import express from "express";
import { ProductController } from "../controllers/product";

const router = express.Router();

router.route("/").get(ProductController.getAll);

export default router;
