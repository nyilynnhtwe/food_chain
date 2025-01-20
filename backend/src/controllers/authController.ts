import { Request, Response, NextFunction } from "express";
import { login, refresh, register } from "../services/authService";

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  login(req, res, next);
};

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  register(req, res, next);
};

export const Refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  refresh(req, res, next);
};
