import { connect } from "http2";
import prisma from "../db/prisma";
import createResponse from "../utils/response";
import { Request, Response } from "express";
import generateRestaurantCreatedTemplate from "../utils/mailer";

export const createRestaurant = async (req: Request, res: Response) => {
  const userId : string = req.body.id;
  const createOwner = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const createRestaurant = await prisma.restaurant.create({
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
  await generateRestaurantCreatedTemplate(
    createOwner.email,
    createOwner.name,
    req.body.name,
    "Restaurant Created",
    "Your restaurant has been created successfully."
  )
  res.status(201).send(createResponse(true, createRestaurant));
};

export const getRestaurants = async (req: Request, res: Response) => {
  const restaurants = await prisma.restaurant.findMany({
    where :
    {
      ownerId : req.body.id
    },
    include :
    {
      items : true,
    }
  });
  res.status(201).send(createResponse(true, restaurants));
};

export const getRestaurantById = async (req: Request, res: Response) => {
  const restaurants = await prisma.restaurant.findUnique({
    where: {
      id: req.params.id,
        ownerId : req.body.id
    },
    include :
    {
      items : true,
      orders : true
    }
  });
  res.status(201).send(createResponse(true, restaurants));
};
