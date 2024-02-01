import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = ({ setNavbarToggler, setSearchModal }) => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
        setNavbarToggler && setNavbarToggler(false);
        setSearchModal && setSearchModal(false);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full  px-1 sm:px-4 py-1.5 flex justify-between items-center shadow-md bg-white rounded-3xl overflow-hidden">
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="text-md flex-1 outline-none border-none placeholder-gray-500 w-1/4" type="text" placeholder="Search products..."/>
            <button type="submit" className="text-gray-500"><SearchIcon /></button>
        </form>
    );
};

export default Searchbar;
