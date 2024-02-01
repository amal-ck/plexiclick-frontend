import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { clearErrors, deleteCategory, deleteProduct, getAdminCategories, getAdminProducts } from '../../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const CategoryTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const accessToken = localStorage.getItem('access')

    const { category = [], error, isDeleted, loading } = useSelector((state) => state.category);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminCategories(accessToken));
    }, [dispatch, error, isDeleted, enqueueSnackbar, accessToken]);

    const deleteProductHandler = (id) => {
        dispatch(deleteCategory(id, accessToken));
    }

    const columns = [
        {
            field: "id",
            headerName: "Category ID",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10">
                            <img draggable="false" src={params.row.image} alt={params.row.name} className="w-full h-fullobject-cover" />
                        </div>
                        {params.row.name}
                    </div>
                )
            },
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
                    <Actions editRoute={"category"} deleteHandler={deleteProductHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    category && category.forEach((item) => {
        rows.unshift({
            id: item.id,
            name: item.category_name,
            image: item.category_image,
        });
    });

    return (
        <>
            <MetaData title="Admin Categories | Flipkart" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">categories</h1>
                <Link to="/admin/new_category" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-darkBlue hover:shadow-lg">New Category</Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </>
    );
};

export default CategoryTable;