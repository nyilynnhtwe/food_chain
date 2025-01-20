import { Request, Response } from "express";    
import { createOrder,confirmOrder } from "../services/orderService";

export const CreateOrder = async (req: Request, res: Response) => {
    await createOrder(req, res);
};

export const ConfirmOrder = async (req: Request, res: Response) => {
    await confirmOrder(req, res);
};
