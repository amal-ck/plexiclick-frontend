import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { REMOVE_PRODUCT_DETAILS, UPDATE_PRODUCT_RESET, UPDATE_VARIANT_RESET } from '../../constants/productConstants';
import { clearErrors, getAdminCategories, getAdminColors, getAdminProducts, getAdminSizes, getAdminSubcategory, getAdminThickness, getAdminVariantDetails, getProductDetails, updateProduct, updateVariant } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import ReviewsTable from './ReviewsTable';
import VariantTable from './VariantTable';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const UpdateVariant = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();
    const accessToken = localStorage.getItem('access')

    const { loading, variantDetails = {} } = useSelector((state) => state.variantDetails);
    const { loading: updateLoading, isUpdated, error  } = useSelector((state) => state.variant);
    const { products = [] } = useSelector((state) => state.products);
    const { colors = [] } = useSelector((state) => state.colors);
    const { sizes = [] } = useSelector((state) => state.sizes);
    const { thicknesses = [] } = useSelector((state) => state.thicknesses);
    const { subcategies = [] } = useSelector((state) => state.subcategies);

    const [product, setProduct] = useState("");
    const [images, setImages] = useState();
    const [oldImages, setOldImages] = useState();
    const [imagesPreview, setImagesPreview] = useState();
    const [productPrice, setProductPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [stock, setStock] = useState("");
    const [reorderLevel, setReorderLevel] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [thickness, setThickness] = useState("");
    const [subcategory, setSubcategory] = useState('');

    const handleProductImageChange = (e) => {
        const file = e.target.files[0];

        setImages();
        setImagesPreview();
        setOldImages();

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(file)
                    setImagesPreview([reader.result]);
                }
            };

            reader.readAsDataURL(file);
        }
    }

    const newProductSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("product_price", productPrice);
        formData.set("sale_price", salePrice);
        formData.set("product", product);
        formData.set("stock", stock);
        formData.set("reorder_level", reorderLevel);
        formData.set("color", color);
        formData.set("size", size);
        formData.set("thickness", thickness)
        formData.set("subcategory", subcategory)
        if (images) {
            formData.set("variant_image", images);
        }
        dispatch(updateVariant(variantDetails.id, formData, accessToken));
    }

    const variantId = params.id;

    useEffect(() => {

        if (variantDetails) {
            setImagesPreview();
            setOldImages(variantDetails.variant_image);
            setProductPrice(variantDetails.product_price);
            setSalePrice(variantDetails.sale_price);
            setProduct(variantDetails.product);
            setStock(variantDetails.stock);
            setReorderLevel(variantDetails.reorder_level);
            setColor(variantDetails.color);
            setSize(variantDetails.size);
            setThickness(variantDetails.thickness);
            setSubcategory(variantDetails.subcategory || '')
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Variant Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_VARIANT_RESET });
            dispatch({ type: REMOVE_PRODUCT_DETAILS });
            navigate(-1)
        }
    }, [dispatch, error, variantDetails, isUpdated, navigate, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getAdminVariantDetails(variantId, accessToken));
        dispatch(getAdminProducts(accessToken));
        dispatch(getAdminColors(accessToken));
        dispatch(getAdminSizes(accessToken));
        dispatch(getAdminThickness(accessToken));
        dispatch(getAdminSubcategory(accessToken));
    }, [dispatch, variantId, accessToken])

    return (
        <>
            <MetaData title="Admin: Update Variant | PlexiClick" />

            {loading && <BackdropLoader />}
            {updateLoading && <BackdropLoader />}
            <button onClick={() => navigate(-1)} className="ml-1 flex items-center gap-0 font-medium text-primary-darkBlue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</button>
            <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">

                <div className="flex flex-col gap-3 m-2 sm:w-full">
                    <h2 className="font-medium">Update Variant</h2>
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="Product Price"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            fullWidth
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                        <TextField
                            label="Sale Price"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            fullWidth
                            value={salePrice}
                            onChange={(e) => setSalePrice(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <TextField
                            label="Product"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            {products && products.map((cat, i) => (
                                <MenuItem value={cat.id} key={i}>
                                    {cat.product_name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="flex justify-between gap-4">

                        <TextField
                            label="Color"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        >
                            {colors && colors.map((cat, i) => (
                                <MenuItem value={cat.id} key={i}>
                                    {cat.color_name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Size"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {sizes && sizes.map((cat, i) => (
                                <MenuItem value={cat.id} key={i}>
                                    {cat.size}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="flex justify-between gap-4">

                        <TextField
                            label="Thickness"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={thickness}
                            onChange={(e) => setThickness(e.target.value)}
                        >
                            {thicknesses && thicknesses.map((cat, i) => (
                                <MenuItem value={cat.id} key={i}>
                                    {cat.thickness}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Subcategory"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                        >
                            <MenuItem value={''}>---</MenuItem>
                            {subcategies && subcategies.map((cat, i) => (
                                <MenuItem value={cat.id} key={i}>
                                    {cat.subcategory}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="Stock"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            fullWidth
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <TextField
                            label="Reorder Level"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            fullWidth
                            required
                            value={reorderLevel}
                            onChange={(e) => setReorderLevel(e.target.value)}
                        />
                    </div>
                    <h2 className="font-medium">Variant Image</h2>
                    <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                        {oldImages && (
                            <img draggable="false" src={oldImages} alt="Product" className="w-full h-full object-contain" />
                        )}
                        {imagesPreview && (
                            <img draggable="false" src={imagesPreview} alt="Product" className="w-full h-full object-contain" />
                        )}
                    </div>
                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                        <input
                            type="file"
                            name="images"
                            onChange={handleProductImageChange}
                            className="hidden"
                        />
                        Choose Files
                    </label>

                    <div className="flex justify-end">
                        <input translate='no' form="mainform" type="submit" className="bg-primary-darkBlue uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Update" />
                    </div>

                </div>

            </form>
        </>
    );
};

export default UpdateVariant;