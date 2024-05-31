import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/isAuthenticated";
import prisma from "../utils/prisma";


export const getNotes = async (req: AuthenticatedRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const notesPerPage = parseInt(req.query.notesPerPage as string) || 10;
    const skip = (page - 1) * notesPerPage;
    try {
        const notes = await prisma.note.findMany({
            where: { userId: req.user!.userId },
            orderBy: { updatedAt: 'desc' },
            skip,
            take: notesPerPage,
        })

        const totalNotes = await prisma.note.count({ where: { userId: req.user!.userId }, })

        res.status(200).json({ sucess: true, notes, totalNotes })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }

}

interface ICreateNoteBody {
    title: string;
    content: string;
}

export const createNote = async (req: AuthenticatedRequest, res: Response) => {
    const { title, content } = req.body as ICreateNoteBody

    if (!title || !content) {
        return res.status(400).json({ success: false, message: "Title and content are required fields." })
    }

    try {
        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId: req.user!.userId
            }
        })

        res.status(201).json({ success: true, note })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

export const updateNote = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params
    const { title, content } = req.body as ICreateNoteBody

    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'Title and content are required fields.' });
    }

    try {
        const note = await prisma.note.update({
            where: { id: id, userId: req.user!.userId },
            data: {
                title,
                content
            }
        })

        if (note) {
            res.status(200).json({ success: true, message: 'Note updated successfully' });
        } else {
            res.status(404).json({ success: true, message: "Note not found or you do not have permission to update this note." })
        }

        res.status(204)
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }

}

export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {


        const note = await prisma.note.findFirst({
            where: {
                id,
                userId: req.user!.userId
            }
        })

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found or you do not have permission to delete this note." })
        }

        await prisma.note.delete({
            where: {
                id,
                userId: req.user!.userId
            }
        })

        res.status(200).json({ success: true, message: 'Note deleted successfully' })

    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}