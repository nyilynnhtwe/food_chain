import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import indexRouter from "./routes/index";


const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());


app.use("/api/v1",indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});