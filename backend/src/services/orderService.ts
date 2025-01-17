import { IItems } from "interfaces/createOrder.interface";
import prisma from "../db/prisma";
import createResponse from "../utils/response";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  const userId: string = req.body.id;
  const items: IItems[] = req.body.items;

  const orderItems = items.map((item) => ({
    itemId: item.itemId,
    quantity: parseInt(item.quantity), // Convert quantity to integer
  }));

  const order = await prisma.order.create({
    data: {
      customerId: userId,
      orderItems: {
        create: orderItems,
      },
      status: "PENDING",
    },
    include: {
      orderItems: true,
    },
  });
  res.status(201).send(createResponse(true, order));
};
