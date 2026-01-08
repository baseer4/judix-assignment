import express from "express";
import { createNote, getNotes, deleteNote } from "../controllers/notes.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createNote);
router.get("/", protectRoute, getNotes);
router.delete("/:id", protectRoute, deleteNote);

export default router;

