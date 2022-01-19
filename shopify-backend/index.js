const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const inventoryRoutes = require("./routes/inventory");
const warehouseRoutes = require("./routes/warehouse");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With,X-Auth-Token, Content-Type, Accept",
//     "Authorization"
//   );
//   next();
// });

app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json())

app.use("/inventory", inventoryRoutes);

app.use("/warehouse", warehouseRoutes);

mongoose
  .connect(
    "mongodb+srv://heenal:heenal25@cluster0.snlhj.mongodb.net/inventory?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080, () => console.log("Server running on 8080"));
  })
  .catch((err) => {
    console.log(err);
  });
