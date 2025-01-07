import { Request, Response, NextFunction } from "express";
import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./routes/index";
import "dotenv/config";
import compression from "compression";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(compression());
app.use(bodyParser.json());

app.use("/api/v1", indexRouter);

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
