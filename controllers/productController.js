

import Product from "../models/Product.js";


// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    console.error("Error getting products", e);
    res.status(500).json({ error: "Server error while fetching products" });
  }
};


//  get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (e) {
    console.error("Error getting product", e);
    res.status(500).json({ error: "Server error while fetching product" });
  }
};













