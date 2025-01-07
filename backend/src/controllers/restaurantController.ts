import { Request, Response } from "express";    
import { createRestaturant, getRestaturants, getRestaturantById } from "../services/restaurantService";

export const CreateRestaturant = async (req: Request, res: Response) => {
    await createRestaturant(req, res);
};

export const GetRestaturants = async (req: Request, res: Response) => {
    await getRestaturants(req, res);
};

export const GetRestaturantById = async (req: Request, res: Response) => {
    await getRestaturantById(req, res);
};