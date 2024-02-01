import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { REMOVE_PRODUCT_DETAILS, UPDATE_CATEGORY_RESET, UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { clearErrors, getAdminCategories, getAdminCategoriesDetails, getProductDetails, updateCategory, updateProduct } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import ReviewsTable from './ReviewsTable';

const UpdateCategory = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();
    const accessToken = localStorage.getItem('access')

    const { loading, categoryDetails={} } = useSelector((state) => state.categoryDetails);
    const { isUpdated, error  } = useSelector((state) => state.category);
    console.log(categoryDetails);

    const [name, setName] = useState("");
    const [images, setImages] = useState();
    const [oldImages, setOldImages] = useState();
    const [imagesPreview, setImagesPreview] = useState();

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

        formData.set("category_name", name);
        if(images){
            formData.set("category_image", images);
        }

        dispatch(updateCategory(categoryDetails.id, formData, accessToken));
    }

    const categoryId = params.id;

    useEffect(() => {
        
        if(categoryDetails){
            setImagesPreview();
            setName(categoryDetails.category_name);
            setOldImages(categoryDetails.category_image);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            enqueueSnackbar("Category Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_CATEGORY_RESET });
            dispatch(getAdminCategoriesDetails(categoryId, accessToken))
            navigate('/admin/category')
        }
    }, [dispatch, navigate, error, isUpdated, enqueueSnackbar, categoryId, categoryDetails]);

    useEffect(() => {
        dispatch(getAdminCategoriesDetails(categoryId, accessToken));
    },[dispatch, categoryId, accessToken])

    return (
        <>
            <MetaData title="Admin: Update Category | PlexiClick" />

            {loading && <BackdropLoader />}
            <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">

                <div className="flex flex-col gap-3 m-2 w-full">
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <h2 className="font-medium">Category Image</h2>
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

export default UpdateCategory;