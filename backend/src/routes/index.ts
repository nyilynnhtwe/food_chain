import express from "express";
import orderRouter from "./orderRouter";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import authenticate from "../middlewares/auth";

const indexRouter = express.Router();


indexRouter.use("/order",orderRouter);
indexRouter.use("/user", authenticate ,userRouter);
indexRouter.use("/auth",authRouter);  

indexRouter.get("/", (req, res) => {
  res.send("Welcome to Food Chain API version1");
});

export default indexRouter;