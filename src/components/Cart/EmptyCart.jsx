import { Link } from 'react-router-dom';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';

const EmptyCart = () => {
    return (
        <>
            <div className='flex flex-row bg-primary-darkBlue p-4 text-white font-sans mt-5'>
                <p><WebAssetOutlinedIcon />  Your cart is currently empty.</p>
            </div>
            <div className='mt-10'>
                <Link to="/products" className="px-4 py-3 bg-primary-darkBlue uppercase shadow hover:shadow-lg text-white rounded-3xl">Return to Shop</Link>
            </div>
        </>
    );
};

export default EmptyCart;
