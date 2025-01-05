import express from "express";

const userRouter = express.Router();

userRouter.post("/login", (req, res) => {
  res.send("login route");
});

userRouter.post("/register", (req, res) => {
  res.send("register route");
});

userRouter.get("/profile", (req, res) => {
  res.send("profile route");
});

export default userRouter;
