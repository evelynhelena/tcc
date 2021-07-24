const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const routes = require("./routes");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
