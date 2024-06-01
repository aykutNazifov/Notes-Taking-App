import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";


interface IRegisterBody {
    name: string;
    email: string;
    password: string;
}

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as IRegisterBody

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Name, email and password are required fields." })
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (existingUser) {
            return res.status(409).json({ success: false, message: "User with this email already exists." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        res.status(200).json({ success: true, message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ success: false, messgae: error })
    }

}

interface ILoginBody {
    email: string;
    password: string;
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body as ILoginBody

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required fields." })
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password." })
        }

        const confirmPassword = await bcrypt.compare(password, user.password)

        if (!confirmPassword) {
            return res.status(401).json({ success: false, message: "Invalid email or password." })
        }

        const accessToken = generateAccessToken({ id: user.id, email: user.email })
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 15 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ success: true, message: "Login successful.", user: { id: user.id, name: user.name, email: user.email } })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}


export const updateToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ error: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string; email: string };
        const accessToken = generateAccessToken({ id: decoded.userId, email: decoded.email });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 15 * 60 * 1000
        });
        res.status(200).json({ success: true, message: 'Access token refreshed' });
    } catch (error) {
        res.status(403).json({ success: true, error: 'Invalid refresh token' });
    }
}


export const logout = (req: Request, res: Response) => {
    res.cookie('accessToken', "", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1
    });
    res.cookie('refreshToken', "", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
}

export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user?.userId },
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({ sucess: true, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}