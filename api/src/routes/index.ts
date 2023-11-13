import express, { Request, Response } from "express";
import productCategoryRoutes from "./product-category.route";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send({ status: "Ok!" });
});

router.use("/product-category", productCategoryRoutes);

export default router;
