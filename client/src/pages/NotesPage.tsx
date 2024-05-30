import React, { useState } from 'react'
import data from "../data.json"
import NotesTable from '../components/NotesTable'
import Header from '../components/Header'
import { Pagination } from '@mui/material'
import { NOTES_PER_PAGE } from '../constants'
import NoteFormModal from '../components/modals/NoteFormModal'


const NotesPage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [notes, setNotes] = useState(data.slice(0, NOTES_PER_PAGE))
    const [page, setPage] = useState(1)

    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
        const startIndex = (value - 1) * NOTES_PER_PAGE;
        const endIndex = Math.min(startIndex + NOTES_PER_PAGE, data.length);
        const currentNotes = data.slice(startIndex, endIndex);
        setNotes(currentNotes)
        setPage(value)
    }

    return (
        <div>
            <div className='container mx-auto py-5'>
                <h1 className='text-2xl font-medium text-center mb-4'>Notes Taking App</h1>
                <p className='mb-4 text-center'>Welcome to your personal notes app. Here you can keep track of your notes easily.</p>
                <button onClick={() => setIsAddModalOpen(true)} className='flex mx-auto mb-4 p-2 border border-solid border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white font-medium transition-all duration-300 '>Add Note</button>
                <NoteFormModal open={isAddModalOpen} handleClose={() => setIsAddModalOpen(false)} />
                <NotesTable notes={notes} />
                <div className='flex justify-center mt-6'>
                    <Pagination count={Math.ceil(data.length / NOTES_PER_PAGE)} page={page} onChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}

export default NotesPage