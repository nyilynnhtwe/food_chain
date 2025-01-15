import { Request, Response, NextFunction } from "express";
import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./routes/index";
import "dotenv/config";
import compression from "compression";
import rateLimit from "express-rate-limit";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerOptions from "./configs/swaggerConfig";
import swaggerUI from "swagger-ui-express";


const PORT = process.env.PORT || 4000;
const app = express();

// every 100 requests from the same IP in 30 minutes
// after the limit is reached, the user will have to wait 30 minutes to make another request
const rateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100,
  message : "Too many requests from this IP, please try again after 30 minutes"
});
app.use(rateLimiter);

// Middleware
// compress all responses
app.use(compression());

// Middleware to parse incoming JSON payloads in request bodies
// This enables req.body to contain the parsed JSON data
app.use(bodyParser.json());


app.use("/api/v1", indexRouter);
const specs = swaggerJsDoc(swaggerOptions);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));


// Catch-all route for undefined endpoints
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "The requested resource was not found on this server.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
