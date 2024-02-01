import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getAllCategories } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import MetaData from '../Layouts/MetaData';
import { useParams } from 'react-router-dom';
import SearchBar from '../Layouts/Header/Searchbar';
import { WISHLIST_RESET } from '../../constants/wishlistConstants';
import { useSnackbar } from 'notistack';
import {  clearWishlistErrors } from '../../actions/wishlistAction';

const Products = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const colorCounts = {};
    const [price, setPrice] = useState([0, 10]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [color, setColor] = useState("");
    
    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [colorToggle, setColorToggle] = useState(true);
    const [filterToggle, setFilterToggle] = useState(false);
    
    const { products = [], loading, } = useSelector((state) => state.products);
    const { category = [] } = useSelector((state) => state.category);
    const { wishlistSuccess, wishlistError, wishlistItems } = useSelector((state)=> state.wishlistItems);
    const keyword = params.keyword;

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    const clearFilters = () => {
        setPrice([0, 10]);
        setSelectedCategory("");
        setColor("");
    }

    if (products) {
        products.forEach((product) => {
            const { color_count } = product;

            // Check if color_count is defined
            if (color_count) {
                Object.entries(color_count).forEach(([colorName, count]) => {
                    if (colorCounts[colorName]) {
                        colorCounts[colorName] += count;
                    } else {
                        colorCounts[colorName] = count;
                    }
                });
            }
        });
    }

    useEffect(() => {
        dispatch(getProducts(keyword, selectedCategory, price, color));
    }, [dispatch, keyword, selectedCategory, price, color]);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);
    

    useEffect(() => {
        if (wishlistError){
            enqueueSnackbar(wishlistError, { variant: "error" });
            dispatch(clearWishlistErrors());
        }
        if (wishlistSuccess){
            enqueueSnackbar("Item added to wishlist", { variant: "success"});
            dispatch({ type: WISHLIST_RESET })
        }
    }, [dispatch, wishlistError, wishlistSuccess, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Shop | Plexi Click" />


            <main className="w-full xl:w-10/12 m-auto mt-8 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">

                    {/* <!-- sidebar column  --> */}
                    <div className={`lg:flex flex-col sm:w-1/3 lg:w-1/5 px-1 ${filterToggle ? 'block' : 'hidden'}`}>

                        {/* <!-- nav tiles --> */}
                        <div className="flex flex-col bg-white rounded-sm mt-5">

                            <SearchBar />
                            {/* <!-- filters header --> */}
                            <div className="flex items-center justify-between gap-5 px-4 py-2 mt-5">
                                <p className="text-lg font-medium">Filter</p>
                                <span className="uppercase text-primary-blue text-xs cursor-pointer font-medium" onClick={() => clearFilters()}>clear all</span>
                            </div>

                            <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">

                                {/* price slider filter */}
                                <div className="flex flex-col gap-2 px-4">
                                    <span className="font-medium text-xs">FILTER BY PRICE</span>

                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        getAriaLabel={() => 'Price range slider'}
                                        min={0}
                                        max={10}
                                    />

                                    <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">{price[1].toLocaleString()} د.ك</span>
                                        <span className="font-medium text-gray-400">—</span>
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">{price[0].toLocaleString()} د.ك</span>
                                    </div>
                                </div>
                                {/* price slider filter */}

                                {/* category filter */}
                                <div className="flex flex-col px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setCategoryToggle(!categoryToggle)}>
                                        <p className="font-medium text-xs uppercase">filter by categories</p>
                                        {categoryToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {categoryToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="category-radio-buttons-group"
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                    name="category-radio-buttons"
                                                    value={selectedCategory}
                                                >
                                                    {category.map((el) => (
                                                        <FormControlLabel 
                                                        key={el.id}
                                                        value={el.category_name} 
                                                        control={<Radio size="small" />} 
                                                        label={
                                                        <span className="text-sm" 
                                                        >
                                                            {el.category_name}
                                                        </span>} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* category filter */}

                                {/* color filter */}
                                <div className="flex flex-col px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setColorToggle(!colorToggle)}>
                                        <p className="font-medium text-xs uppercase">filter by colours</p>
                                        {colorToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {colorToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="color-radio-buttons-group"
                                                    onChange={(e) => setColor(e.target.value)}
                                                    value={color}
                                                    name="color-radio-buttons"
                                                >
                                                    {Object.entries(colorCounts).map(([colorName, totalCount], i) => (
                                                        <FormControlLabel
                                                            key={i}
                                                            value={colorName}
                                                            control={<Radio size="small" />}
                                                            label={
                                                                <span className="text-sm">
                                                                    <span>({totalCount})</span>
                                                                    <span className='ml-4'>{colorName}</span>
                                                                </span>


                                                            }
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* color filter */}

                            </div>

                        </div>
                        {/* <!-- nav tiles --> */}

                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- search column --> */}
                    <div className="flex-1">
                        <span
                            className="flex items-center text-black font-medium gap-1 cursor-pointer ml-8 hover:text-primary-darkBlue lg:hidden"
                            onClick={() => setFilterToggle(!filterToggle)}
                        >
                            {filterToggle ?
                                <FilterAltOffOutlinedIcon sx={{ fontSize: "30px" }} /> :
                                <FilterAltOutlinedIcon sx={{ fontSize: "30px" }} />
                            }
                        </span>

                        {!loading && (products === undefined || products.length === 0) && (
                            <div className='flex flex-row bg-primary-darkBlue p-4 text-white font-sans mt-5'>
                                <p><WebAssetOutlinedIcon /> No products were found matching your selection.</p>
                            </div>
                        )}

                        {loading ? <Loader /> : (
                            <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">

                                <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 w-full place-content-start overflow-hidden pb-4">
                                    {products?.map((product) => (
                                        <Product {...product} key={product.id} />
                                    ))
                                    }
                                </div>

                            </div>
                        )}
                    </div>
                    {/* <!-- search column --> */}
                </div >
                {/* <!-- row --> */}

            </main >
        </>
    );
};

export default Products;
