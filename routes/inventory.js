const express = require("express");

const inventoryController = require("../controllers/inventory");

const router = express.Router();

// POST /inventory/item
router.post("/item", inventoryController.createItem);

// PUT /inventory/item
router.put("/item/:itemId", inventoryController.editItem);

// DELETE /inventory/item
router.delete("/item/:itemId", inventoryController.deleteItem);

// GET /inventory/items
router.get("/items", inventoryController.viewItems);

module.exports = router;
