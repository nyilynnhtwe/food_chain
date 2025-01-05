import express from "express";
import orderRouter from "./order/orderRouter";
import userRouter from "./user/userRouter";
import authRouter from "./auth/authRouter";

const indexRouter = express.Router();


indexRouter.use("orders",orderRouter);
indexRouter.use("user",userRouter);
indexRouter.use("/auth",authRouter);  

indexRouter.get("/", (req, res) => {
  res.send("Welcome to Food Chain API version1");
});

export default indexRouter;