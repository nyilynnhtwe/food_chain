import express from "express";
import { Request, Response } from "express";
import { Login, Refresh, Register } from "../controllers/authController";

const authRouter = express.Router();

authRouter.get("/", (req : Request, res:Response) => {
  res.send("auth route");
});

authRouter.post("/login", async (req : Request, res : Response) => {
   Login(req, res);
});

authRouter.post("/register", async (req : Request, res : Response) => {
  Register(req, res); 
});

authRouter.post("/refresh", async (req : Request, res : Response) => {
  Refresh(req, res);
});

export default authRouter;