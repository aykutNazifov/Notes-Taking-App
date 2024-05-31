import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";


export const getNotes = expressAsyncHandler((req: Request, res: Response) => {
    res.send("Test getNotes")
})