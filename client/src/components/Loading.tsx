import RefreshIcon from '@mui/icons-material/Refresh';

const Loading = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <RefreshIcon className='animate-spin' fontSize='large' />
        </div>
    )
}

export default Loading