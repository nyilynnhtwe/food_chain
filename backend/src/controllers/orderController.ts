import { Request, Response } from "express";    
import { createOrder } from "../services/orderService";

export const CreateOrder = async (req: Request, res: Response) => {
    await createOrder(req, res);
};
