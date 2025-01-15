import express from "express";
import { Request, Response } from "express";
import { Login, Refresh, Register } from "../controllers/authController";
import { CreateItem } from "../controllers/itermController";

const itemRouter = express.Router();

itemRouter.get("/", (req : Request, res:Response) => {
  res.send("auth route");
});

itemRouter.post("/", async (req : Request, res : Response) => {
   CreateItem(req, res);
});

itemRouter.post("/register", async (req : Request, res : Response) => {
  Register(req, res); 
});

export default itemRouter;