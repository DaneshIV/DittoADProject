import express from "express";

import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  getFeedback,
} from "../controllers/client.js";

const router = express.Router();

// Routes
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);
router.get("/feedback", getFeedback);

export default router;
