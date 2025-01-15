import express from "express";
import { Request, Response } from "express";
import { Login, Refresh, Register } from "../controllers/authController";
import { CreateItem, GetItems } from "../controllers/itemController";

const itemRouter = express.Router();
/** POST Methods */
/**
 * @openapi
 * '/api/v1/item':
 *  post:
 *     tags:
 *     - Item Controller
 *     summary: Create an item for owner's restaurant
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - price
 *              - category
 *            properties:
 *              name:
 *                type: string
 *                default: Pad Kra Pao
 *              description:
 *                type: string
 *                default: Pad Kra Pao is a very popular Thai food dish between local people in Thailand.
 *              category:
 *                type: string
 *                default: food
 *              available:
 *                type: boolean
 *                default: true
 *              price:
 *                type: number
 *                default: 50
 *              imageUrl:
 *                type: string
 *                default: http://localhost:8888/static/padkrapao.png
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *  get:
 *    tags:
 *     - Item Controller
 *    summary: Get a list of items with optional filters
 *    description: Fetches items from the database, with optional filters for restaurant, category, and name.
 *    parameters:
 *      - name: restaurantId
 *        in: query
 *        description: The ID of the restaurant to filter by
 *        required: false
 *        schema:
 *          type: string
 *          example: "1"
 *      - name: category
 *        in: query
 *        description: The category of the item to filter by
 *        required: false
 *        schema:
 *          type: string
 *          example: "Pizza"
 *      - name: name
 *        in: query
 *        description: A name or partial name to search for in items (case insensitive)
 *        required: false
 *        schema:
 *          type: string
 *          example: "Pepperoni"
 *    responses:
 *      200:
 *        description: Successfully fetched items
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */


itemRouter.get("/", (req: Request, res: Response) => {
  GetItems(req,res);
});

itemRouter.post("/", async (req: Request, res: Response) => {
  CreateItem(req, res);
});

export default itemRouter;
