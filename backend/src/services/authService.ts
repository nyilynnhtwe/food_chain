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

export const login = async (req: Request, res: Response) => {
  const loginData: LoginRequest = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: loginData.email,
    },
  });
  if (!user) {
    res.status(400).send(createResponse(false, undefined, "User not found"));
    return;
  }
  const passwordMatch = await bcrypt.compareSync(
    loginData.password,
    user.password
  );
  if (!passwordMatch) {
    res
      .status(400)
      .send(createResponse(false, undefined, "'Invalid credentials."));
    return;
  }
  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });
  const loginResponse: LoginResponse = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  res.status(200).send(createResponse(true, loginResponse));
};

export const register = async (req: Request, res: Response) => {
  const registerRequest: RegisterRequest = req.body;
  const userCheck = await prisma.user.findUnique({
    where: {
      email: registerRequest.email,
    },
  });
  if (userCheck) {
    res
      .status(400)
      .send(createResponse(false, undefined, "User already exists"));
  } else {
    const encryptedPassword = bcrypt.hashSync(registerRequest.password, 10);
    const user = await prisma.user.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        role: registerRequest.role,
        password: encryptedPassword,
      },
    });
    const response: RegisterResponse = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.status(201).send(createResponse(true, response));
  }
};

export const refresh = async (req: Request, res: Response) => {
  const inputRefreshToken = req.body.refreshToken;
  if (!inputRefreshToken) {
    res
      .status(400)
      .send(createResponse(false, undefined, "Refresh Token not provided"));
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
      .send(createResponse(false, undefined, "Invalid Refresh Token"));
  }
};
