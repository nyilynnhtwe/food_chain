import createResponse from "../utils/response";
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";

const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken: string = req.header("Authorization")?.split(" ")[1] || "";
  if (!accessToken) {
    res.status(401).send(createResponse(false, undefined, "No access token"));
  }
  try {
    const userId = verifyAccessToken(accessToken);
    req.body.id = userId;
    next();
  } catch (error) {
    res
      .status(403)
      .send(createResponse(false, undefined, "Invalid access token"));
  }
};

export default authenticated;
