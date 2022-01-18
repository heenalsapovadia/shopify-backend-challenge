const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const warehouseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export a model based on the above defined schema
module.exports = mongoose.model("Warehouse", warehouseSchema);
