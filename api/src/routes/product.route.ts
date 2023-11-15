import express from "express";
import ProductController from "../controllers/product";
import auth from "../lib/middleware/auth";

const router = express.Router();

router
  .route("/")
  .get(ProductController.getAll)
  .post(auth, ProductController.create);
router
  .route("/:id")
  .get(ProductController.getById)
  .put(auth, ProductController.update);
router.route("/category/:id").get(ProductController.getByCategory);

export default router;
