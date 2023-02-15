//THIS FILE SHOULD BE IN A routes MAP
import express from "express";

//EXAMPLE LINES OF ACTIONROUTES.JS, NEED A ACTIONCONTROLLER IN CONTROLLERS MAP
//CHECK cnExpressActionController FOR MAKING AN ACTIONCONTROLLER

import { getAll, getById } from "../controllers/actionController.js";

const router = express.Router();
router.get("/singers", getAll);
router.get("/singers/:id", getById);
export default router;
