const Item = require("../models/item");

exports.createItem = (req, res, next) => {
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
      res.status(201).json({
        message: "Item Creation successful",
        item: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Create Item Failed",
      });
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
        res.status(404).json({
          message: "Could not find item",
        });
      }
      item.name = name;
      item.brand = brand;
      item.quantity = quantity;

      return item.save();
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Item Update successful",
        item: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Update Item Failed",
        error: err.message(),
      });
    });
};

exports.deleteItem = (req, res, next) => {
  const itemId = req.params.itemId;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        res.status(404).json({
          message: "Could not find item",
        });
      }
      return Item.findByIdAndRemove(itemId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Item Delete successful",
        item: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Delete Item Failed",
        error: err.message(),
      });
    });
};

exports.viewItems = (req, res, next) => {
  Item.find()
    .then((items) => {
      res.status(200).json({
        message: "Fetched all items successfully",
        items,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Fetch Failed",
      });
    });
};
