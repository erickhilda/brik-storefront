// const httpStatus = require("http-status");
import httpStatus from "http-status";
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ProductCategoryController {
  static async getAll(req: Request, res: Response) {
    const { searchString, skip, take, orderBy } = req.query;
    const productCategory = await prisma.product_Category.findMany();

    res.status(httpStatus.OK).json({
      message: "Success",
      data: productCategory,
    });
  }
}
