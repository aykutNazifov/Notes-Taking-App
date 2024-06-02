import React from 'react'
import { Box, Modal } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boxStyle } from '../../mui-styles'
import { INote } from '../../types/types';
import apiClient from '../../utils/apiClient';
import { toast } from 'react-toastify';

interface IDeleteNoteModal {
    note: INote | null;
    handleClose: () => void;
}

const DeleteNoteModal: React.FC<IDeleteNoteModal> = ({ note, handleClose }) => {
    const queryClient = useQueryClient()

    const deleteNote = async (noteId: string) => {
        await apiClient.delete(`/note/${noteId}`)
        handleClose()
    }

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: async () => {
            toast.success("Note deleted successfully!")
            await queryClient.invalidateQueries({ queryKey: ['notes'] })
        },
        onError: () => {
            toast.error("Something went wrong! Please try again.")
        }
    });

    const handleDelete = () => {
        deleteMutation.mutate(note?.id!);
    }

    return (
        <Modal
            open={note ? true : false}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={boxStyle}>
                <div className='flex flex-col items-center'>
                    <h2 className='font-medium mb-4 text-lg'>Confirm Delete</h2>
                    <p className='mb-4'>Are you sure you want to delete the note titled "{note?.title}"? This action cannot be undone.</p>
                    <div className='flex justify-end gap-4 w-full'>
                        <button className='p-2 border border-solid border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white font-medium transition-all duration-300 ' onClick={handleClose}>Cancel</button>
                        <button onClick={handleDelete} className='p-2 border border-solid text-red-500 border-red-500 rounded-lg hover:bg-red-500 hover:text-white font-medium transition-all duration-300 '>Delete</button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default DeleteNoteModal