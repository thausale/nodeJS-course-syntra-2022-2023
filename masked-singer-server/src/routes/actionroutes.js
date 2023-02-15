//THIS FILE SHOULD BE IN A routes MAP
import express from "express";

import {
  getAll,
  getById,
  updateSinger,
  deleteSinger,
  createSinger,
} from "../controllers/actionController.js";

const router = express.Router();
router.put("/:id", updateSinger);
router.get("/singers", getAll);
router.get("/singers/:id", getById);
router.delete("/:id", deleteSinger);
router.post("/", createSinger);

export default router;
