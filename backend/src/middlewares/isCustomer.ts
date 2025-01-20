import createResponse from "../utils/response";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";

const isCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.body.role;
  if (userRole == UserRole.CUSTOMER) {
    next();
  } else {
    res
      .status(403)
      .send(createResponse(false, "You are not a customer"));
  }
};

export default isCustomer;
