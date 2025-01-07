import { CreateRestaturant, GetRestaturants, GetRestaturantById } from "../controllers/restaurantController";
import express, { Request, Response } from "express";

const restaurantRouter = express.Router();

restaurantRouter.get("/", (req: Request, res: Response) => {
  GetRestaturants(req, res);
});

restaurantRouter.post("/", async (req: Request, res: Response) => {
  CreateRestaturant(req, res);
});

restaurantRouter.get("/:id", (req: Request, res: Response) => {
  GetRestaturantById(req, res);
});

restaurantRouter.put("/:id", (req: Request, res: Response) => {
  res.send("order route");
});

restaurantRouter.delete("/:id", (req: Request, res: Response) => {
  res.send("order route");
});

export default restaurantRouter;
