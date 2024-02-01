import React from 'react';
import Searchbar from './Searchbar';
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useEffect } from 'react';

const SearchDiv = ({ setSearchModal, searchDiv }) => {
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchModal(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75 z-50"
            style={{ display: searchDiv ? 'block' : 'none' }}
        >
            <div className="bg-white p-4 rounded-md shadow-md w-1/2 m-auto" ref={searchRef} style={{ marginTop: '15%' }}>
                <div className="flex flex-row items-center justify-between mb-3 p-2">
                    <h2 className="">TYPE TO SEARCH</h2>
                    <button onClick={() => setSearchModal(false)} className="text-gray-500">
                        <CloseIcon />
                    </button>
                </div>
                <div>
                    <Searchbar setSearchModal={setSearchModal} />
                </div>
            </div>
        </div>
    );
};

export default SearchDiv;
