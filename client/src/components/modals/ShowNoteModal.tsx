import React from 'react'
import { Box, Modal } from '@mui/material'
import { INote } from '../../types/types';
import { boxStyle } from '../../mui-styles';

interface IShowNoteModalProps {
    note: INote | null;
    handleClose: () => void;
}

const ShowNoteModal: React.FC<IShowNoteModalProps> = ({ note, handleClose }) => {
    return (
        <Modal
            open={note ? true : false}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={boxStyle}>
                <div className='flex flex-col items-center'>
                    <h3 className='text-xl font-medium mb-4'>{note?.title}</h3>
                    <p>{note?.content}</p>
                </div>
            </Box>
        </Modal>
    )
}

export default ShowNoteModal