import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { clearErrors, createColor, createSize, createSubcategory, createThickness, deleteCategory, deleteColor, deleteSize, deleteSubcategory, deleteThickness, getAdminCategories, getAdminColors, getAdminSizes, getAdminSubcategory, getAdminThickness } from '../../actions/productAction';
import { DELETE_COLOR_RESET, DELETE_PRODUCT_RESET, DELETE_SIZE_RESET, DELETE_SUBCATEGORY_RESET, DELETE_THICKNESS_RESET, NEW_COLOR_RESET, NEW_SIZE_RESET, NEW_SUBCATEGORY_RESET, NEW_THICKNESS_RESET } from '../../constants/productConstants';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { TextField } from '@mui/material';

const Config = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const accessToken = localStorage.getItem('access')

    const { colors = [], colorLoading, colorError, colorSuccess, colorDeleted } = useSelector((state) => state.colors);
    const { sizes = [], sizeLoading, sizeError, sizeSuccess, sizeDeleted } = useSelector((state) => state.sizes);
    const { thicknesses = [], thicknessLoading, thicknessError, thicknessSuccess, thicknessDeleted } = useSelector((state) => state.thicknesses);
    const { subcategies = [], subcategoryLoading, subcategoryError, subcategorySuccess, subcategoryDeleted } = useSelector((state) => state.subcategies);

    const [ color, setColor ] = useState('');
    const [ size, setSize ] = useState('');
    const [ thickness, setThickness ] = useState('');
    const [ subcategory, setSubcategory ] = useState('');

    useEffect(() => {
        if (colorError) {
            enqueueSnackbar(colorError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (sizeError) {
            enqueueSnackbar(sizeError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (thicknessError) {
            enqueueSnackbar(thicknessError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (subcategoryError) {
            enqueueSnackbar(subcategoryError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (colorDeleted) {
            enqueueSnackbar("Color Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_COLOR_RESET });
        }
        if (sizeDeleted) {
            enqueueSnackbar("Size Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_SIZE_RESET });
        }
        if (thicknessDeleted) {
            enqueueSnackbar("Thickness Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_THICKNESS_RESET });
        }
        if (subcategoryDeleted) {
            enqueueSnackbar("Subcategory Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_SUBCATEGORY_RESET });
        }
        if (colorSuccess) {
            enqueueSnackbar("Color Created", { variant: "success" });
            dispatch({ type: NEW_COLOR_RESET });
        }
        if (sizeSuccess) {
            enqueueSnackbar("Size Created", { variant: "success" });
            dispatch({ type: NEW_SIZE_RESET });
        }
        if (thicknessSuccess) {
            enqueueSnackbar("Thickness Created", { variant: "success" });
            dispatch({ type: NEW_THICKNESS_RESET });
        }
        if (subcategorySuccess) {
            enqueueSnackbar("Subcategory Created", { variant: "success" });
            dispatch({ type: NEW_SUBCATEGORY_RESET });
        }
        dispatch(getAdminCategories(accessToken));
        dispatch(getAdminColors(accessToken));
        dispatch(getAdminSizes(accessToken));
        dispatch(getAdminThickness(accessToken));
        dispatch(getAdminSubcategory(accessToken));
    }, [dispatch, colorError, sizeError, thicknessError, subcategoryError, colorDeleted, sizeDeleted, thicknessDeleted, subcategoryDeleted, colorSuccess, thicknessSuccess, sizeSuccess, subcategorySuccess, enqueueSnackbar, accessToken]);

    const deleteColorHandler = (id) => {
        dispatch(deleteColor(id, accessToken));
    }
    const deleteSizeHandler = (id) => {
        dispatch(deleteSize(id, accessToken));
    }
    const deleteThicknessHandler = (id) => {
        dispatch(deleteThickness(id, accessToken));
    }
    const deleteSubcategoryHandler = (id) => {
        dispatch(deleteSubcategory(id, accessToken));
    }

    const newColorSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("color_name", color);
        dispatch(createColor(formData, accessToken));
        setColor('')
    }
    const newSizeSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("size", size);
        dispatch(createSize(formData, accessToken));
        setSize('')
    }
    const newThicknessSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("thickness", thickness);
        dispatch(createThickness(formData, accessToken));
        setThickness('')
    }
    const newSubcategorySubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("subcategory", subcategory);
        dispatch(createSubcategory(formData, accessToken));
        setSubcategory('')
    }

    // color

    const colorColumns = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "color",
            headerName: "Color",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"color"} deleteHandler={deleteColorHandler} id={params.row.id} />
                );
            },
        },
    ];

    const colorRows = [];

    colors && colors.forEach((item) => {
        colorRows.unshift({
            id: item.id,
            color: item.color_name,
        });
    });

    // size

    const sizeColumns = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "size",
            headerName: "Size",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"size"} deleteHandler={deleteSizeHandler} id={params.row.id} />
                );
            },
        },
    ];

    const sizeRows = [];

    sizes && sizes.forEach((item) => {
        sizeRows.unshift({
            id: item.id,
            size: item.size,
        });
    });

    // thickness

    const thicknessColumns = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "thickness",
            headerName: "Thickness",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"thickness"} deleteHandler={deleteThicknessHandler} id={params.row.id} />
                );
            },
        },
    ];

    const thicknessRows = [];

    thicknesses && thicknesses.forEach((item) => {
        thicknessRows.unshift({
            id: item.id,
            thickness: item.thickness,
        });
    });

    // subcategory

    const subcategoryColumns = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "subcategory",
            headerName: "Subcategory",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"subcategory"} deleteHandler={deleteSubcategoryHandler} id={params.row.id} />
                );
            },
        },
    ];

    const subcategoryRows = [];

    subcategies && subcategies.forEach((item) => {
        subcategoryRows.unshift({
            id: item.id,
            subcategory: item.subcategory,
        });
    });

    return (
        <>
            <MetaData title="Admin Config | PlexiClick" />

            {colorLoading && <BackdropLoader />}
            {sizeLoading && <BackdropLoader />}
            {thicknessLoading && <BackdropLoader />}
            {subcategoryLoading && <BackdropLoader />}
            <div className='flex md:flex-row flex-col justify-between gap-6'>
            <div className='w-full'>
                <div>
                    <form onSubmit={newColorSubmitHandler} className="flex justify-between items-center">
                    <TextField
                        label="Color"
                        variant="outlined"
                        size="small"
                        required
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <input translate='no' type="submit" className="bg-primary-darkBlue uppercase w-1/3 p-2 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Add Color" />
                    </form>
                    
                </div>
                <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                    <DataGrid
                        rows={colorRows}
                        columns={colorColumns}
                        pageSize={10}
                        disableSelectIconOnClick
                        sx={{
                            boxShadow: 0,
                            border: 0,
                        }}
                    />
                </div>
            </div>
            <div className='w-full'>
            <div>
                    <form onSubmit={newSizeSubmitHandler} className="flex justify-between items-center">
                    <TextField
                        label="Size"
                        variant="outlined"
                        size="small"
                        required
                        
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                    <input translate='no' type="submit" className="bg-primary-darkBlue uppercase w-1/3 p-2 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Add Size" />
                    </form>
                    
                </div>
                <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                    <DataGrid
                        rows={sizeRows}
                        columns={sizeColumns}
                        pageSize={10}
                        disableSelectIconOnClick
                        sx={{
                            boxShadow: 0,
                            border: 0,
                        }}
                    />
                </div>
            </div>
            </div>
            <div className='flex md:flex-row flex-col justify-between gap-6'>
            <div className='w-full'>
            <div>
                    <form onSubmit={newThicknessSubmitHandler} className="flex justify-between items-center">
                    <TextField
                        label="Thickness"
                        variant="outlined"
                        size="small"
                        required
                        
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                    />
                    <input translate='no' type="submit" className="bg-primary-darkBlue uppercase w-1/3 p-2 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Add Thickness" />
                    </form>
                    
                </div>
                <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                    <DataGrid
                        rows={thicknessRows}
                        columns={thicknessColumns}
                        pageSize={10}
                        disableSelectIconOnClick
                        sx={{
                            boxShadow: 0,
                            border: 0,
                        }}
                    />
                </div>
            </div>
            <div className='w-full'>
            <div>
                    <form onSubmit={newSubcategorySubmitHandler} className="flex justify-between items-center">
                    <TextField
                        label="Subcategory"
                        variant="outlined"
                        size="small"
                        required
                        
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                    />
                    <input translate='no' type="submit" className="bg-primary-darkBlue uppercase w-1/3 p-2 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Add Subcategory" />
                    </form>
                    
                </div>
                <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                    <DataGrid
                        rows={subcategoryRows}
                        columns={subcategoryColumns}
                        pageSize={10}
                        disableSelectIconOnClick
                        sx={{
                            boxShadow: 0,
                            border: 0,
                        }}
                    />
                </div>
            </div>
            </div>
        </>
    );
};

export default Config;