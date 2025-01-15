import { CreateRestaturant, GetRestaturants, GetRestaturantById } from "../controllers/restaurantController";
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

restaurantRouter.get("/", (req: Request, res: Response) => {
  GetRestaturants(req, res);
});

restaurantRouter.post("/", async (req: Request, res: Response) => {
  CreateRestaturant(req, res);
});

restaurantRouter.get("/:id", (req: Request, res: Response) => {
  GetRestaturantById(req, res);
});

restaurantRouter.put("/:id", (req: Request, res: Response) => {
  res.send("order route");
});

restaurantRouter.delete("/:id", (req: Request, res: Response) => {
  res.send("order route");
});

export default restaurantRouter;
