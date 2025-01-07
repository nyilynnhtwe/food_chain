import { CreateOrder } from "../controllers/orderController";
import express, { Request, Response } from "express";

const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  res.send("order route");
});

orderRouter.post("/", (req, res) => {
  CreateOrder(req, res);
});

orderRouter.get("/:id", (req, res) => {
  res.send("order route");
});

orderRouter.put("/:id", (req, res) => {
  res.send("order route");
});

orderRouter.delete("/:id", (req, res) => {
  res.send("order route");
});

export default orderRouter;
