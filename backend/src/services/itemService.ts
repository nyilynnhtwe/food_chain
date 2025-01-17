import prisma from "../db/prisma";
import createResponse from "../utils/response";
import { Request, Response } from "express";

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, imageUrl, restaurantId } =
      req.body;

    // Verify if the restaurant exists
    const restaurantExists = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurantExists) {
      return res
        .status(404)
        .send({ success: false, message: "Restaurant not found" });
    }

    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        price,
        category,
        imageUrl,
        restaurant: {
          connect: { id: restaurantId },
        },
      },
    });
    res.status(201).send(createResponse(true, newItem));
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ success: false, message: error.message });
    }
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const { restaurantId, category, name } = req.query;

    const filters: any = { restaurant : 
      {
        ownerId : req.body.id
      }
     };

    if (restaurantId) filters.restaurantId = restaurantId;
    if (category) filters.category = category;
    if (name) filters.name = { contains: name as string, mode: "insensitive" };
    const items = await prisma.item.findMany({
      where: filters,
    });

    res.status(200).send(createResponse(true, items));
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(createResponse(false, error.message));
    }
  }
};
