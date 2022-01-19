const Warehouse = require("../models/warehouse");
const apiResponse = require("../helpers/apiResponse");
const { validationResult } = require("express-validator");

exports.createWarehouse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.errorResponse(
      res,
      errors.array(),
      "Create Item Failed - Validation Failed - Entered data is incorrect",
      422
    );
  }
  const name = req.body.name;
  const address = req.body.address;

  const warehouse = new Warehouse({
    name,
    address
  });

  warehouse
    .save()
    .then((result) => {
      console.log(result);
      apiResponse.successResponseWithData(
        res,
        "Warehouse Creation successful",
        result
      );
    })
    .catch((err) => {
      console.log(err);
      apiResponse.errorResponse(res, err, "Create Warehouse Failed");
    });
};

exports.fetchWarehouses = (req, res, next) => {
  Warehouse.find()
    .then((warehouses) => {
      apiResponse.successResponseWithData(
        res,
        "Fetched all warehouses successfully",
        warehouses,
        200
      );
    })
    .catch((err) => {
      console.log(err);
      apiResponse.errorResponse(res, err, "Fetch Failed");
    });
};
