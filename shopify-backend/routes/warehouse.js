const express = require("express");
const { body } = require("express-validator");

const warehouseController = require("../controllers/warehouse");

const router = express.Router();

// POST /warehouse
router.post(
  "/create",
  [
    body("name").trim().isLength({ min: 1 }),
    body("address").trim().isLength({ min: 1 }),
  ],
  warehouseController.createWarehouse
);

// GET /warehouse
router.get("/get", warehouseController.fetchWarehouses);

module.exports = router;
