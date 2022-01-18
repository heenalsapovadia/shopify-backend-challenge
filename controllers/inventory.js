const Item = require("../models/item");
const apiResponse = require("../helpers/apiResponse");
const { validationResult } = require("express-validator");

exports.createItem = (req, res, next) => {
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
  const brand = req.body.brand;
  const quantity = req.body.quantity;

  const item = new Item({
    name,
    brand,
    quantity,
  });

  item
    .save()
    .then((result) => {
      console.log(result);
      apiResponse.successResponseWithData(
        res,
        "Item Creation successful",
        result
      );
    })
    .catch((err) => {
      console.log(err);
      apiResponse.errorResponse(res, err, "Create Item Failed");
    });
};

exports.editItem = (req, res, next) => {
  const itemId = req.params.itemId;
  const name = req.body.name;
  const brand = req.body.brand;
  const quantity = req.body.quantity;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        apiResponse.notFoundResponse(res, "Could not find item");
      }
      item.name = name;
      item.brand = brand;
      item.quantity = quantity;
      return item.save();
    })
    .then((result) => {
      console.log(result);
      apiResponse.successResponseWithData(
        res,
        "Item Update successful",
        result
      );
    })
    .catch((err) => {
      console.log(err);
      apiResponse.errorResponse(res, err, "Update Item Failed");
    });
};

exports.deleteItem = (req, res, next) => {
  const itemId = req.params.itemId;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        apiResponse.notFoundResponse(res, "Could not find item");
      }
      return Item.findByIdAndRemove(itemId);
    })
    .then((result) => {
      console.log(result);
      apiResponse.successResponseWithData(
        res,
        "Item deleted successfully!",
        result
      );
    })
    .catch((err) => {
      console.log(err);
      apiResponse.errorResponse(res, err, "Delete Item Failed");
    });
};

exports.viewItems = (req, res, next) => {
  Item.find()
    .then((items) => {
      apiResponse.successResponseWithData(
        res,
        "Fetched all items successfully",
        items,
        200
      );
    })
    .catch((err) => {
      console.log(err);
      apiResponse.errorResponse(res, err, "Fetch Failed");
    });
};
