import httpStatus from "http-status";
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma-service";

const ProductCategoryController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const productCategory = await prisma.product_Category.findMany({
        orderBy: {
          id: "asc",
        },
      });

      res.status(httpStatus.OK).json({
        message: "Success",
        data: productCategory,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong",
        });
      }
    }
  },
};

export default ProductCategoryController;
