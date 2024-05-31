require("dotenv").config()
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRouter from "./routes/auth.route"
import noteRouter from "./routes/note.route"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))

app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found!`
    })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server start at port ${port}`)
})