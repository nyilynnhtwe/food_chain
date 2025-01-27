import isCustomer from "../middlewares/isCustomer";
import { CreateOrder, ConfirmOrder, AssignOrder } from "../controllers/orderController";
import express, { Request, Response } from "express";
import isOwner from "../middlewares/isOwner";

/**
 * @swagger
 * components:
 *  schemas:
 *    IItems:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          itemId:
 *            type: string
 *            description: "Unique identifier for the item"
 *          pricePerItem:
 *            type: number
 *            format: float
 *            description: "Price of a single unit of the item"
 *          quantity:
 *            type: integer
 *            format: int32
 *            description: "Number of items"
 *      required:
 *        - itemId
 *        - pricePerItem
 *        - quantity
 */

const orderRouter = express.Router();

/** POST Methods */
/**
 * @openapi
 * '/api/v1/order':
 *  post:
 *     tags:
 *     - Order Controller
 *     summary: Create an order by a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - items
 *              - price
 *              - category
 *            properties:
 *              deliveryFee:
 *                type: number
 *                format: float
 *                default: 50.0
 *                description: "Delivery fee for the order"
 *              items:
 *                $ref: '#/components/schemas/IItems'
 *                default:
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *  @openapi
 *  '/api/v1/order/confirm':
 *  post:
 *     tags:
 *     - Order Controller
 *     summary: Confirm an order by a user(May be Owner Or Rider) whether it is accepted,cancelled or delivered
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *                type: string
 *                format: float
 *                default: "ACCEPTED"
 *                description: "Status for the order(ACCEPTED OR CANCELLED)"
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

orderRouter.get("/", (req, res) => {
  res.send("order route");
});

orderRouter.post("/", isCustomer, (req, res) => {
  CreateOrder(req, res);
});

orderRouter.post("/assign", isCustomer, (req, res) => {
  AssignOrder(req, res);
});

orderRouter.post("/confirm", isOwner, (req, res) => {
  ConfirmOrder(req, res);
});

orderRouter.get("/:id", (req, res) => {
  res.send("order route");
});

orderRouter.put("/:id", (req, res) => {
  res.send("order route");
});

orderRouter.delete("/:id", (req, res) => {
  res.send("order route");
});

export default orderRouter;
