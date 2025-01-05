import jwt from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (payload: any) => {
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error("Access Token Secret is not defined");
  }
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (payload: any) => {
  if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
    throw new Error("Refresh Token Secret is not defined");
  }
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });
};

const verifyAccessToken = (token: string) => {
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error("Access Token Secret is not defined");
  }
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET || "");
};

const verifyRefreshToken = (token: string) => {
  if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
    throw new Error("Refresh Token Secret is not defined");
  }
  const payload = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);  ;
  return payload;
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
