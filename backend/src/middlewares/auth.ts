import createResponse from "../utils/response";
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";
import prisma from "../db/prisma";

const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken: string = req.header("Authorization")?.split(" ")[1] || "";
  if (!accessToken) {
    res.status(401).send(createResponse(false, "No access token"));
  }
  try {
    const userId : string = verifyAccessToken(accessToken);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    req.body.id = userId;
    req.body.role = user.role;
    next();
  } catch (error) {
    res
      .status(403)
      .send(createResponse(false, "Invalid access token"));
  }
};

export default authenticated;
