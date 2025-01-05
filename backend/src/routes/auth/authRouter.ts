import express from "express";
import bcrypt from "bcrypt";
import createResponse from "../../utils/response";
import prisma from "../../db/prisma";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "interfaces/login.interface";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.utils";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("auth route");
});

authRouter.post("/login", async (req, res) => {
  const loginData: LoginRequest = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: loginData.email,
    },
  });
  if (!user) {
    res.status(400).send(createResponse(false, undefined, "User not found"));
  }
  const passwordMatch = await bcrypt.compareSync(
    loginData.password,
    user.password
  );
  if (!passwordMatch) {
    res
      .status(400)
      .send(createResponse(false, undefined, "Password does not match"));
  }
  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });
  const loginResponse: LoginResponse = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  res.status(200).send(createResponse(true, loginResponse));
});

authRouter.post("/register", async (req, res) => {
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
    res.status(201).send(createResponse(true, user));
  }
});

authRouter.post("/refresh", async (req, res) => {
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
    const response : LoginResponse = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    res.status(200).send(createResponse(true, response));
  } catch (err) {
    res
      .status(400)
      .send(createResponse(false, undefined, "Invalid Refresh Token"));
  }
});

export default authRouter;
