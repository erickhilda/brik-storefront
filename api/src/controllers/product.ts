import httpStatus from "http-status";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma-service";

const ProductController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const { search, category, page, size } = req.query;

      let productCategoryId: number | null = null;
      if (category) {
        const productCategory = await prisma.product_Category.findFirst({
          where: {
            path: {
              contains: category as string,
            },
          },
        });
        productCategoryId = productCategory?.id || null;
      }
      const searchByCategory: Prisma.ProductWhereInput = productCategoryId
        ? { OR: [{ category_id: { equals: productCategoryId } }] }
        : {};

      const searchByKeyword: Prisma.ProductWhereInput = search
        ? {
            OR: [{ name: { contains: search as string, mode: "insensitive" } }],
          }
        : {};

      const offset = page
        ? (parseInt(page as string) - 1) * parseInt(size as string)
        : 0;
      const limit = size ? parseInt(size as string) : 9;

      const products = await prisma.product.findMany({
        where: {
          ...searchByCategory,
          ...searchByKeyword,
          id: {
            not: 0,
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          name: "asc",
        },
      });

      res.status(httpStatus.OK).json({
        message: "Success",
        data: products,
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
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      res.status(httpStatus.OK).json({
        message: "Success",
        data: product,
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
  getByCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const products = await prisma.product.findMany({
        where: {
          category_id: parseInt(id as string),
        },
      });

      res.status(httpStatus.OK).json({
        message: "Success",
        data: products,
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

export default ProductController;
