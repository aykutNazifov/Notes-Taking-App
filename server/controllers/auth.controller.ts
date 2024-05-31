import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";


export const login = expressAsyncHandler((req: Request, res: Response) => {
    res.send("Test Login")
})