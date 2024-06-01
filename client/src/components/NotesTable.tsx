import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { INote } from '../types/types';
import ShowNoteModal from './modals/ShowNoteModal';
import NoteFormModal from './modals/NoteFormModal';
import DeleteNoteModal from './modals/DeleteNoteModal';

//icons
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

interface INotesTableProps {
    notes: INote[]
}

const NotesTable: React.FC<INotesTableProps> = ({ notes }) => {
    const [selectedNote, setSelectedNote] = useState<INote | null>(null)
    const [selectedEditNote, setSelectedEditNote] = useState<INote | null>(null)
    const [selectedDeleteNote, setSelectedDeleteNote] = useState<INote | null>(null)

    const handleEdit = (note: INote) => {
        setSelectedEditNote(note)
    }
    const handleDelete = (note: INote) => {
        setSelectedDeleteNote(note)
    }

    const handleShowNote = (note: INote) => {
        setSelectedNote(note)
    }

    const handleCloseModal = () => {
        setSelectedNote(null)
    }

    return (
        <>
            <DeleteNoteModal note={selectedDeleteNote} handleClose={() => setSelectedDeleteNote(null)} />
            <NoteFormModal edit open={selectedEditNote ? true : false} handleClose={() => setSelectedEditNote(null)} note={selectedEditNote} />
            <ShowNoteModal note={selectedNote} handleClose={handleCloseModal} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notes.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Tooltip title={row.id}>
                                        <span>
                                            {row.id.slice(0, 3)}...
                                        </span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{dayjs(row.created_at).format('DD MMM YYYY')}</TableCell>
                                <TableCell>{dayjs(row.updated_at).format('DD MMM YYYY')}</TableCell>
                                <TableCell>
                                    <Tooltip title="Show Note">
                                        <IconButton onClick={() => handleShowNote(row)}>
                                            <VisibilityIcon fontSize='small' color='primary' />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit Note">
                                        <IconButton onClick={() => handleEdit(row)}>
                                            <EditIcon fontSize='small' />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Note">
                                        <IconButton onClick={() => handleDelete(row)}>
                                            <DeleteIcon fontSize='small' color='error' />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default NotesTable