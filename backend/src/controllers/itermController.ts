import { Request, Response } from "express";    
import { createItem } from "../services/itermService";

export const CreateItem = async (req: Request, res: Response) => {
    await createItem(req, res);
};
