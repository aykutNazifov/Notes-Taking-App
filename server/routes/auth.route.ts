import { Router } from "express";
import { getUserInfo, login, logout, register, updateToken } from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/update-token", updateToken)
router.get("/logout", logout)

router.get("/user", isAuthenticated, getUserInfo)

export default router