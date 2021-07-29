import express, { json } from "express";
const app = express();
import cors from "cors";
const port = 3000;
import routes from "./routes";
require("dotenv").config();

app.use(json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
