import jwt, { JwtPayload } from "jsonwebtoken";

const generateAccessToken = (payload: any) => {
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error("Access Token Secret is not defined");
  }
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "5hr",
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
  const verification = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET) as JwtPayload;
  if (!verification) {
    throw new Error("Invalid access token");
  } else {
    return verification.id;
  }
};

const verifyRefreshToken = (token: string) => {
  if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
    throw new Error("Refresh Token Secret is not defined");
  }
  const payload = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
  return payload;
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
