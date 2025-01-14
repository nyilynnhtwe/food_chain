import { connect } from "http2";
import prisma from "../db/prisma";
import createResponse from "../utils/response";
import { Request, Response } from "express";

export const createRestaturant = async (req: Request, res: Response) => {
  const userId = req.body.id;
  const createRestaturant = await prisma.restaurant.create({
    data: {
      name: req.body.name,
      location: {
        create: {
          address: req.body.address,
          district: {
            connect: { id: req.body.districtId },
          },
        },
      },
      owner: {
        connect: { id: userId },
      },
    },
  });
  res.status(201).send(createResponse(true, createRestaturant));
};

export const getRestaturants = async (req: Request, res: Response) => {
  const restaurants = await prisma.restaurant.findMany({});
  res.status(201).send(createResponse(true, restaurants));
};

export const getRestaturantById = async (req: Request, res: Response) => {
  const restaurants = await prisma.restaurant.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(201).send(createResponse(true, restaurants));
};
