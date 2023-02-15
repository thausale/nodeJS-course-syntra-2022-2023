import { products, cart } from "../data.js";

export const addToCart = async (req, res) => {
  try {
    const { id } = req.body;
    const filteredProducts = products.filter((product) => id === product.id);
    cart.push(filteredProducts[0]); //VERVANGEN MET MONGODB
    console.log(cart);
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
  }
};
