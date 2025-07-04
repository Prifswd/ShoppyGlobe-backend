import express from "express";
import { addToCart, updateCartItem, deleteCartItem } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// secure with JWT
router.use(authMiddleware);

// add to cart
router.post("/", addToCart);

// update cart item
router.put("/:id", updateCartItem);

// delete cart item
router.delete("/:id", deleteCartItem);



export default router;






