import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { createProduct, clearErrors, getAdminCategories } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const NewProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');

    const { loading, success, error } = useSelector((state) => state.newProduct);
    const { category = [],} = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categry, setCategory] = useState("");
    const [images, setImages] = useState();
    const [imagesPreview, setImagesPreview] = useState();
    const [featured, setFeatured] = useState(false);


    const handleProductImageChange = (e) => {
        const file = e.target.files[0];

        setImages();
        setImagesPreview();

        if (file) {
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(file)
                    setImagesPreview([reader.result]);
                }
            };
            reader.readAsDataURL(file);
        };
    }

    const newProductSubmitHandler = (e) => {
        e.preventDefault();

        if (!images) {
            enqueueSnackbar("Add Product Images", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("product_name", name);
        formData.set("product_desc", description);
        formData.set("category", categry);
        if(images){
            formData.append("product_image", images);
        };
        formData.set("is_featured", featured)

        dispatch(createProduct(formData, accessToken));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Product Created", { variant: "success" });
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate("/admin/products");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getAdminCategories(accessToken));
    },[dispatch, accessToken])

    return (
        <>
            <MetaData title="Admin: New Product | PlexiClick" />

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
                    </div>
                    <h2 className="font-medium">Product Images</h2>
                    <div className="flex gap-2 overflow-x-auto h-32 border rounded">
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
                        <input translate='no' form="mainform" type="submit" className="bg-primary-darkBlue uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Submit" />
                    </div>

                </div>

            </form>
        </>
    );
};

export default NewProduct;
