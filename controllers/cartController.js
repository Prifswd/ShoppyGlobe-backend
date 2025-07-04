

import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";


//  post add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  try {
    // check product exists
    const product = await Product.findById(productId);
    if (!product)
      return res.status(400).json({ error: "Invalid product ID" });

    // check quantity
    if (quantity <= 0)
      return res.status(400).json({ error: "Quantity must be positive" });

    let cartItem = await CartItem.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ userId, productId, quantity });
      await cartItem.save();
    }
    res.json(cartItem);
  } catch (e) {
    console.error("Error adding to cart", e);
    res.status(500).json({ error: "Server error while adding to cart" });
  }
};





//  put update cart item
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const userId = req.user.id;
  try {
    if (quantity <= 0)
      return res.status(400).json({ error: "Quantity must be positive" });
    const cartItem = await CartItem.findOneAndUpdate(
      { _id: req.params.id, userId },
      { quantity },
      { new: true }
    );
    if (!cartItem)
      return res.status(404).json({ error: "Cart item not found" });
    res.json(cartItem);
  } catch (e) {
    console.error("Error updating cart", e);
    res.status(500).json({ error: "Server error while updating cart" });
  }
};





//  delete cart item
export const deleteCartItem = async (req, res) => {
  const userId = req.user.id;
  try {
    const deleted = await CartItem.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!deleted)
      return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Item removed from cart" });
  } catch (e) {
    console.error("Error deleting cart", e);
    res.status(500).json({ error: "Server error while deleting from cart" });
  }
};















