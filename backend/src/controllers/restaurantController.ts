import { Request, Response } from "express";    
import { createRestaurant, getRestaurants, getRestaurantById } from "../services/restaurantService";

export const CreateRestaurant = async (req: Request, res: Response) => {
    await createRestaurant(req, res);
};

export const GetRestaurants = async (req: Request, res: Response) => {
    await getRestaurants(req, res);
};

export const GetRestaurantById = async (req: Request, res: Response) => {
    await getRestaurantById(req, res);
};