import express from "express";
import { Request, Response } from "express";
import { Login, Refresh, Register } from "../controllers/authController";

const authRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRole:
 *       type: string
 *       enum:
 *         - CUSTOMER
 *         - RESTAURANT_OWNER
 *         - RIDER
 *       description: "User roles for the platform. The user must have one of these roles."
 */

authRouter.get("/", (req: Request, res: Response) => {
  res.send("auth route");
});

/** POST Methods */
/**
 * @openapi
 * '/api/v1/auth/login':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: nyilynnhtwe@mail.com
 *              password:
 *                type: string
 *                default: nyilynnhtwe!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *
 * '/api/v1/auth/register':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: nyilynnhtwe
 *              email:
 *                type: string
 *                default: nyilynnhtwe@mail.com
 *              role:
 *                $ref: '#/components/schemas/UserRole'
 *                default:
 *              password:
 *                type: string
 *                default: nyilynnhtwe!@
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
authRouter.post("/login", async (req: Request, res: Response) => {
  Login(req, res);
});

authRouter.post("/register", async (req: Request, res: Response) => {
  Register(req, res);
});

authRouter.post("/refresh", async (req: Request, res: Response) => {
  Refresh(req, res);
});

export default authRouter;
