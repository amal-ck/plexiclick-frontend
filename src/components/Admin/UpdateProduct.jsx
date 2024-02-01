import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { REMOVE_PRODUCT_DETAILS, UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { clearErrors, getAdminCategories, getProductDetails, updateProduct } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import ReviewsTable from './ReviewsTable';
import VariantTable from './VariantTable';

const UpdateProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();
    const accessToken = localStorage.getItem('access')

    const { loading, productDetails={} } = useSelector((state) => state.productDetails);
    const { loading: updateLoading, isUpdated, error  } = useSelector((state) => state.product);
    const { category = [],} = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categry, setCategory] = useState("");
    const [images, setImages] = useState();
    const [oldImages, setOldImages] = useState();
    const [imagesPreview, setImagesPreview] = useState();
    const [featured, setFeatured] = useState(false)

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

        formData.set("product_name", name);
        formData.set("product_desc", description);
        formData.set("category", categry);
        if(images){
            formData.set("product_image", images);
        }
        formData.set("is_featured", featured)

        dispatch(updateProduct(productDetails.id, formData, accessToken));
    }

    const productName = params.id;

    useEffect(() => {
        
        if(productDetails){
            setImagesPreview();
            setName(productDetails.product_name);
            setDescription(productDetails.product_desc);
            setCategory(productDetails.category);
            setOldImages(productDetails.product_image);
            setFeatured(productDetails.is_featured);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        // if (updateError) {
        //     enqueueSnackbar(updateError, { variant: "error" });
        //     dispatch(clearErrors());
        // }
        if (isUpdated) {
            enqueueSnackbar("Product Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_PRODUCT_RESET });
            dispatch(getProductDetails(productName));
        }
    }, [dispatch, error, isUpdated, productDetails, productName, navigate, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getProductDetails(productName));
        dispatch(getAdminCategories(accessToken));
    },[dispatch, productName, accessToken])

    return (
        <>
            <MetaData title="Admin: Update Product | PlexiClick" />

            {loading && <BackdropLoader />}
            {updateLoading && <BackdropLoader />}
            <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">

                <div className="flex flex-col gap-3 m-2 sm:w-full">
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {/* <div className="flex justify-between">
                        <TextField
                            label="Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="Cutted Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={cuttedPrice}
                            onChange={(e) => setCuttedPrice(e.target.value)}
                        />
                    </div> */}
                    <div className="flex justify-between gap-4">
                        <TextField
                            label="Category"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={categry}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {category && category.map((cat,i) => (
                                <MenuItem value={cat.id} key={i}>
                                    {cat.category_name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Featured"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={featured}
                            onChange={(e) => setFeatured(e.target.value)}
                        >
                        <MenuItem value={false} >Not Featured</MenuItem>
                        <MenuItem value={true} >Featured</MenuItem>
                            
                        </TextField>
                        {/* <TextField
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
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        /> */}
                    </div>
                    <h2 className="font-medium">Product Image</h2>
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
            <VariantTable productId={productDetails.id}/>
            <ReviewsTable productId={productDetails.id}/>
        </>
    );
};

export default UpdateProduct;