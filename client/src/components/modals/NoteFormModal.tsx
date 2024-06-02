import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Box, Modal, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { boxStyle } from '../../mui-styles'
import { INote } from '../../types/types'
import apiClient from '../../utils/apiClient'

//icons
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { toast } from 'react-toastify'

interface INoteFormModal {
    open: boolean;
    handleClose: () => void;
    note?: INote | null;
    edit?: boolean;
}

interface INoteData {
    title: string;
    content: string
}

const schema = yup
    .object({
        title: yup.string().required("Title is required."),
        content: yup.string().required("Content is required."),
    })
    .required()

const NoteFormModal: React.FC<INoteFormModal> = ({ open, handleClose, note, edit }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
    })
    const queryClient = useQueryClient()

    useEffect(() => {
        if (note) {
            setValue("title", note.title)
            setValue("content", note.content)
        }
    }, [note, setValue]);

    const createNote = async (newNote: INoteData) => {
        const createdNote = await apiClient.post("/note", newNote)
        reset()
        handleClose()
        return createdNote
    }

    const updateNote = async (newNote: INoteData) => {
        const noteId = note?.id
        const updatedNote = await apiClient.put(`/note/${noteId}`, newNote)
        reset()
        handleClose()
        return updatedNote
    }

    const mutation = useMutation({
        mutationFn: edit ? updateNote : createNote,
        onSuccess: () => {
            toast.success(edit ? "Note updated successfully!" : "Note created successfully!")
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        },
        onError: () => {
            toast.error("Something went wrong! Please try again.")
        }
    })

    const onSubmit = (data: INoteData) => {
        mutation.mutate(data);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={boxStyle}>
                <div className='flex flex-col items-center'>
                    <h2 className='font-medium mb-4 text-lg'>{edit ? "Edit" : "Add"} Note</h2>
                    <p className='text-center mb-4'>Fill in the following fields to {edit ? "edit" : "add"} your note:</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
                        <TextField error={errors.title?.message ? true : false} helperText={errors.title?.message} className='w-full mb-4' id="title" label="Title" variant="outlined" {...register("title")} />
                        <TextField error={errors.content?.message ? true : false} helperText={errors.content?.message} className='w-full' id="content" label="Content" variant="outlined" multiline rows={4} {...register("content")} />
                        <button className='flex mx-auto p-2 border border-solid border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white font-medium transition-all duration-300 disabled:cursor-not-allowed' disabled={mutation.isPending}>{mutation.isPending ? <AutorenewIcon className="animate-spin" /> : edit ? "Edit" : "Add"} Note</button>
                    </form>
                </div>
            </Box>
        </Modal>
    )
}

export default NoteFormModal