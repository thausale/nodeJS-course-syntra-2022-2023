import express from "express";
import { addTodo } from "../controllers/actionController.js";
import { todoModel } from "../models/todoModel.js";
import { validate } from "express-validation";

const router = express.Router();

router.post("/", validate(todoModel), addTodo);

export default router;
