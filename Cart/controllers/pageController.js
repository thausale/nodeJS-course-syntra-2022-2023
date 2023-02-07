// THESE PAGES GET USED IN THE PAGECONTROLLER IN cnExpressRouter
import { products, cart } from "../data.js";

const indexPage = (req, res) => {
  try {
    res.render("index", {
      pageTitle: "Niels 🫶🏻 Zeno 🚀 de masters!",
      products,
      cart,
    });
  } catch (error) {
    console.error(error);
  }
};
export { indexPage };
