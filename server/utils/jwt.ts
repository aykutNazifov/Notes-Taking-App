require("dotenv").config()
import jwt from "jsonwebtoken"

export const generateAccessToken = (user: { id: string, email: string }) => {
    return jwt.sign({ userId: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m"
    })
}

export const generateRefreshToken = (user: { id: string, email: string }) => {
    return jwt.sign({ userId: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "7d"
    })
}