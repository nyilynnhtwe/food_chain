import prisma from "../db/prisma";
import express from "express";
import createResponse from "../utils/response";

const userRouter = express.Router();

userRouter.get("/profile", async (req, res) => {
  const userId = req.body.id;
  const requestedUser = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      orders: true,
      restaurant: true,
      // password is omitted
    },
    where: {
      id: userId,
    },
  });
  res.status(200).send(createResponse(true, requestedUser));
});

export default userRouter;
