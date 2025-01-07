import prisma from "../db/prisma";
import createResponse from "../utils/response";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.body.id;
  const createOrder = await prisma.order.create({
    data: {
    //   name: req.body.name,
    //   owner: {
    //     connect: { id: userId },
    //   },
    },
  });
  res.status(201).send(createResponse(true, createOrder));
};
