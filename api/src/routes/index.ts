import express, { Request, Response } from "express";
import productCategoryRoutes from "./product-category.route";
import productRoutes from "./product.route";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send({ status: "Ok!" });
});

router.use("/product-category", productCategoryRoutes);
router.use("/product", productRoutes);

export default router;
