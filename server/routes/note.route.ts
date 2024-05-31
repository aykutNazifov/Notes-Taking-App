import { Router } from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = Router()

router.get("/", isAuthenticated, getNotes)
router.post("/", isAuthenticated, createNote)
router.put("/:id", isAuthenticated, updateNote)
router.delete("/:id", isAuthenticated, deleteNote)

export default router