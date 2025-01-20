import prisma from "../db/prisma";
import { Request, Response, NextFunction } from "express";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "interfaces/login.interface";
import bcrypt from "bcrypt";
import createResponse from "../utils/response";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.utils";
import { User } from "@prisma/client";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginData: LoginRequest = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
    });
    if (!user) {
      res.status(400).send(createResponse(false, "User not found"));
      return;
    }
    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.password
    );
    if (!passwordMatch) {
      res
        .status(400)
        .send(createResponse(false, "'Invalid credentials."));
      return;
    }
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });
    const loginResponse: LoginResponse = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    res.status(200).send(createResponse(true, loginResponse));
  } catch (error) {
    res
      .status(500)
      .send(createResponse(false, "An unexpected error occurred"));
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerRequest: RegisterRequest = req.body;
    const userCheck: User | null = await prisma.user.findUnique({
      where: {
        email: registerRequest.email,
      },
    });
    if (userCheck) {
      res
        .status(400)
        .send(createResponse(false, "User already exists"));
    } else {
      const encryptedPassword = bcrypt.hashSync(registerRequest.password, 10);
      const user: User = await prisma.user.create({
        data: {
          name: registerRequest.name,
          email: registerRequest.email,
          role: registerRequest.role,
          password: encryptedPassword,
        },
      });
      const response: RegisterResponse = {
        name: user.name || null,
        email: user.email || null,
        role: user.role || null,
      };
      res.status(201).send(createResponse(true, response));
    }
  } catch (error) {
    res
      .status(500)
      .send(createResponse(false, "An unexpected error occurred"));
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const inputRefreshToken = req.body.refreshToken;
  if (!inputRefreshToken) {
    res
      .status(400)
      .send(createResponse(false, "Refresh Token not provided"));
  }
  try {
    const decoded = verifyRefreshToken(inputRefreshToken);
    let userId = "";
    if (typeof decoded !== "string" && "id" in decoded) {
      userId = decoded.id;
    }
    const accessToken = generateAccessToken({ id: userId });
    const refreshToken = generateRefreshToken({ id: userId });
    const response: LoginResponse = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    res.status(200).send(createResponse(true, response));
  } catch (err) {
    res
      .status(400)
      .send(createResponse(false, "Invalid Refresh Token"));
  }
};
