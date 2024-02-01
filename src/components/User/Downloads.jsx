import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import { Link } from 'react-router-dom';

const Downloads = () => {
    return (
            <>
            <div className='flex flex-row bg-primary-darkBlue p-4 text-white font-sans'>
                <p><WebAssetOutlinedIcon /> No downloads available yet.</p>
                <Link to='/products' className='hidden md:block hover:bg-black rounded-3xl px-5'>Browse products</Link>
            </div>
        </>
        
    )

}
export default Downloads;
