import * as bcrypt from "bcryptjs";
import httpStatus from "http-errors";
import * as jwt from "../lib/jwt";
import { prisma } from "../lib/prisma-service";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

interface UserAuthData {
  email: string;
  password: string;
  accessToken?: string;
  name?: string;
}

function getNameFromEmail(email: string) {
  return email.split("@")[0];
}

async function register(data: Pick<UserAuthData, "email" | "password">) {
  try {
    const { email } = data;
    const name = getNameFromEmail(email);
    data.password = bcrypt.hashSync(data.password, 8);

    let user = prisma.user.create({
      data: {
        ...data,
        name,
      },
    });

    const accessToken = await jwt.signAccessToken(user);

    return {
      ...user,
      accessToken: accessToken,
    };
  } catch (error) {
    throw error;
  }
}

async function login(data: UserAuthData) {
  try {
    const { email, password } = data;
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw httpStatus.NotFound("User not registered");
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
      throw httpStatus.Unauthorized("Email address or password not valid");
    const { password: userPassword, ...userWithoutPassword } = user;
    const accessToken = await jwt.signAccessToken(userWithoutPassword);
    return { ...userWithoutPassword, accessToken };
  } catch (error) {
    throw error;
  }
}

export const AuthController = {
  authRegister: async (req: Request, res: Response) => {
    try {
      const data = await register(req.body);
      res.status(201).json({
        message: "User registered",
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({
          message: error.message,
        });
      } else if (error instanceof httpStatus.HttpError) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  },
  authLogin: async (req: Request, res: Response) => {
    try {
      const data = await login(req.body);
      res.status(201).json({
        message: "User logged in",
        data,
      });
    } catch (error) {
      console.log("🚀 ~ authLogin: ~ error:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({
          message: error.message,
        });
      } else if (error instanceof httpStatus.HttpError) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  },
};
