// THESE PAGES GET USED IN THE PAGECONTROLLER IN cnExpressRouter
import { products, cart } from "../data.js";

const indexPage = (req, res) => {
  try {
    res.render("index", {
      pageTitle: "Niels π«Άπ» Zeno π de masters!",
      products,
      cart,
    });
  } catch (error) {
    console.error(error);
  }
};
export { indexPage };
