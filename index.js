const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const inventoryRoutes = require("./routes/inventory");

const app = express();

app.use(bodyParser.json());

app.use("/inventory", inventoryRoutes);

mongoose
  .connect(
    "mongodb+srv://heenal:heenal25@cluster0.snlhj.mongodb.net/inventory?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
