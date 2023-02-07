//THIS FILE SHOULD BE IN A routes MAP
import express from "express";
const router = express.Router();
//EXAMPLE LINES OF PAGEROUTES.JS, YOU NEED A PAGECONTROLLER.JS FILE IN CONTROLLERS MAP
//CHECK cnExpressPageController for making a pagecontroller
import { indexPage } from "../controllers/pageController.js";
router.get("/", indexPage);
// router.get('/about', aboutPage);

export default router;
