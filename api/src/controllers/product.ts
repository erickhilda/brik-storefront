import httpStatus from "http-status";
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ProductController {
  static async getAll(req: Request, res: Response) {
    // const { searchString } = req.query;
    // const { collection } = req.params;
    // const productCategoryId = await prisma.product_Category.findUnique({
    //   where: { path: collection },
    // });

    // const searchByCategory: Prisma.ProductWhereInput = productCategoryId
    //   ? { OR: [{ category_id: { equals: productCategoryId?.id } }] }
    //   : {};

    // const searchByKeyword: Prisma.ProductWhereInput = searchString
    //   ? {
    //       OR: [{ name: { contains: searchString as string } }],
    //     }
    //   : {};

    const products = await prisma.product.findMany();
    // {
    //   where: {
    //     ...searchByCategory,
    //     ...searchByKeyword,
    //   },
    // }

    res.status(httpStatus.OK).json({
      message: "Success",
      data: products,
    });
  }
}
