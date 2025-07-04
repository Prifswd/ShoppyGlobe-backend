import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

// seed data from api and store to mongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected for seeding");
    const response = await axios.get("https://dummyjson.com/products?limit=30");
    const products = response.data.products.map((p) => ({
      title: p.title,
      description: p.description,
      price: p.price,
      stock: p.stock || 50,
      thumbnail: p.thumbnail,
      category: p.category
    }));
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Seeded products successfully!");
    process.exit();
  })
  .catch(console.error);














