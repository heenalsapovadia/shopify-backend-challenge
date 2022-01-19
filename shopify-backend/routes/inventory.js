const express = require("express");
const { body } = require("express-validator");

const inventoryController = require("../controllers/inventory");

const router = express.Router();

// POST /inventory/item
router.post(
  "/item",
  [
    body("name").trim().isLength({ min: 5 }),
    body("brand").trim().isLength({ min: 3 }),
    body("quantity").trim().isInt(),
  ],
  (req, res, next) => {
    // console.log("body", req.body);
    next();
  },
  inventoryController.createItem
);

// PUT /inventory/item
router.put("/item/:itemId", inventoryController.editItem);

// DELETE /inventory/item
router.delete("/item/:itemId", inventoryController.deleteItem);

// GET /inventory/items
router.get("/items", inventoryController.viewItems);

// router.all()

module.exports = router;
