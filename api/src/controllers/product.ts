import httpStatus from "http-status";
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ProductController {
  static async getAll(req: Request, res: Response) {
    const { search, category } = req.query;

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

    const products = await prisma.product.findMany({
      where: {
        ...searchByCategory,
        ...searchByKeyword,
        id: {
          not: 0,
        },
      },
    });

    res.status(httpStatus.OK).json({
      message: "Success",
      data: products,
    });
  }
}
