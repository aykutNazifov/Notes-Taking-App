import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@mui/material'
import { NOTES_PER_PAGE } from '../constants'
import NotesTable from '../components/NotesTable'
import NoteFormModal from '../components/modals/NoteFormModal'
import apiClient from '../utils/apiClient'
import Loading from '../components/Loading'


const NotesPage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [page, setPage] = useState(1)

    const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const fetchNotes = async () => {
        const res = await apiClient(`/note?page=${page}&notesPerPage=${NOTES_PER_PAGE}`)
        return { notes: res.data.notes, totalNotes: res.data.totalNotes }
    }

    const { isLoading, data } = useQuery({
        queryKey: ['notes', page],
        queryFn: fetchNotes
    })


    return (
        <div>
            <div className='container mx-auto px-2 md:px-10 lg:px-16 py-5'>
                <h1 className='text-2xl font-medium text-center mb-4'>Notes Taking App</h1>
                <p className='mb-4 text-center'>Welcome to your personal notes app. Here you can keep track of your notes easily.</p>
                <button onClick={() => setIsAddModalOpen(true)} className='flex mx-auto mb-4 p-2 border border-solid border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white font-medium transition-all duration-300 '>Add Note</button>
                <NoteFormModal open={isAddModalOpen} handleClose={() => setIsAddModalOpen(false)} />
                {data?.notes.length === 0 ? (
                    <div className="text-center text-gray-500">
                        Notes are empty. Create your first note.
                    </div>
                ) : (
                    <>
                        {isLoading ? (
                            <div className='w-full flex items-center justify-center'>
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <NotesTable notes={data?.notes} />
                                <div className='flex justify-between items-center mt-6'>
                                    <p>{data?.totalNotes} notes</p>
                                    <Pagination count={Math.ceil(data?.totalNotes / NOTES_PER_PAGE)} page={page} onChange={handlePageChange} />
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default NotesPage