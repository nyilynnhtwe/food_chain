import { IItems } from "interfaces/createOrder.interface";
import prisma from "../db/prisma";
import createResponse from "../utils/response";
import { Request, Response } from "express";
import { OrderStatus } from "@prisma/client";

export const createOrder = async (req: Request, res: Response) => {
  const deliveryFee = req.body.deliveryFee || 50;
  const userId: string = req.body.id;
  const items: IItems[] = req.body.items;
  const subtotal = items.reduce(
    (sum, item) => sum + item.pricePerItem * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;
  const orderItems = items.map((item) => ({
    pricePerItem: item.pricePerItem,
    itemId: item.itemId,
    quantity: item.quantity, // Convert quantity to integer
  }));

  const order = await prisma.order.create({
    data: {
      customerId: userId,
      total,
      subtotal,
      orderItems: {
        create: orderItems,
      },
      status: OrderStatus.PENDING,
    },
    include: {
      orderItems: true,
    },
  });
  res.status(201).send(createResponse(true, order));
};

export const confirmOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const orderStatus : OrderStatus = req.body.status;
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: orderStatus,
      },
    });
    res.status(200).send(createResponse(true, order));
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(createResponse(false, error.message));
    }
  }
};

