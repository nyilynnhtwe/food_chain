import express from "express";
import orderRouter from "./orderRouter";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import authenticated from "../middlewares/auth";
import restaurantRouter from "./restaurantRouter";

const indexRouter = express.Router();

indexRouter.use("/restaurant",authenticated,restaurantRouter);
indexRouter.use("/order",authenticated,orderRouter);
indexRouter.use("/user", authenticated ,userRouter);
indexRouter.use("/auth",authRouter);  

indexRouter.get("/", (req, res) => {
  res.send("Welcome to Food Chain API version1");
});

export default indexRouter;