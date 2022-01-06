const express = require("express");
const inventoryRoutes = require("./routes/inventory");

const app = express();

app.use("/inventory", inventoryRoutes);

app.listen(8080);
