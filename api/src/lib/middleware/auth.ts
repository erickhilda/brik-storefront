import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "../jwt";
import { User } from "@prisma/client";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Unauthorized",
    });
  }
  if (req.headers.authorization?.split(" ")[0] !== "Bearer") {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }

  const token = req.headers.authorization?.split(" ")[1] as string;
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }
  await jwt
    .verifyAccessToken<User>(token)
    .then((user) => {
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: "Unauthorized",
        });
      }
      next();
    })
    .catch((e) => {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid token",
      });
    });
};

export default auth;
