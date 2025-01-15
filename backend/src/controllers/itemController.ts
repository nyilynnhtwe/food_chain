import { Request, Response } from "express";    
import { createItem, getItems } from "../services/itemService";

export const CreateItem = async (req: Request, res: Response) => {
    await createItem(req, res);
};

export const GetItems = async (req: Request, res: Response) => {
    await getItems(req, res);
};
