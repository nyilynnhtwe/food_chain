import createResponse from "../utils/response";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";

const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.body.role;
  if (userRole == UserRole.RESTAURANT_OWNER) {
    next();
  } else {
    res
      .status(403)
      .send(createResponse(false, undefined, "You are not an owner"));
  }
};

export default isOwner;
