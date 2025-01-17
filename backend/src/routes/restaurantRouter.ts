import isOwner from "../middlewares/isOwner";
import { CreateRestaurant, GetRestaurants, GetRestaurantById } from "../controllers/restaurantController";
import express, { Request, Response } from "express";

const restaurantRouter = express.Router();
 
/** GET Methods */
    /**
     * @openapi
     * '/api/v1/restaurant':
     *  get: 
     *     security:
     *      - BearerAuth: []
     *     tags:
     *     - Restaurant Controller
     *     summary: Gets all the restaurants
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     * '/api/v1/restaurant/{id}':
     *  get: 
     *     security:
     *      - BearerAuth: []
     *     tags:
     *     - Restaurant Controller
     *     summary: Get a restaurant by id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the restaurant
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */

    /** POST Method */
/**
 * @openapi
 * '/api/v1/restaurant':
 *  post:
 *     security:
 *      - BearerAuth: []
 *     tags:
 *     - Restaurant Controller
 *     summary: Create a new restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - districtId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "The Gourmet Kitchen"
 *               address:
 *                 type: string
 *                 example: "123 Foodie Lane, Taste City"
 *               districtId:
 *                 type: string
 *                 example: "Italian"
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Bad Request - Invalid input
 *       500:
 *         description: Server Error
 */
restaurantRouter.get("/", (req: Request, res: Response) => {
  GetRestaurants(req, res);
});

restaurantRouter.post("/", isOwner ,async (req: Request, res: Response) => {
  CreateRestaurant(req, res);
});

restaurantRouter.get("/:id", (req: Request, res: Response) => {
  GetRestaurantById(req, res);
});

restaurantRouter.put("/:id", (req: Request, res: Response) => {
  res.send("order route");
});

restaurantRouter.delete("/:id", (req: Request, res: Response) => {
  res.send("order route");
});

export default restaurantRouter;
