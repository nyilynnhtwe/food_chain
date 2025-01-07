import { Request, Response, NextFunction } from "express";
import { login, refresh, register } from "../services/authService";

export const Login = async (req: Request, res: Response) => {
  login(req, res);
};

export const Register = async (req: Request, res: Response) => {
  register(req, res);
};

export const Refresh = async (req: Request, res: Response) => {
  refresh(req, res);
};
