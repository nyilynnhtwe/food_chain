import express from "express";

const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  res.send("order route");
});

orderRouter.post("/", (req, res) => {
  res.send("order route");
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