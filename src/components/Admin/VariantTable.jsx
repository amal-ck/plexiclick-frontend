import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { clearErrors, deleteProduct, deleteVariant, getAdminProducts, getAdminVariants, getAdminVariantsofProduct } from '../../actions/productAction';
import { DELETE_PRODUCT_RESET, DELETE_VARIANT_RESET } from '../../constants/productConstants';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const VariantTable = ({ productId }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const accessToken = localStorage.getItem('access')

    const { variants = [], error } = useSelector((state) => state.variants);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.variant);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Variant Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_VARIANT_RESET });
        }
        dispatch(getAdminVariantsofProduct(productId, accessToken));
    }, [dispatch, error, isDeleted, deleteError, enqueueSnackbar, productId, accessToken]);

    const deleteVariantHandler = (id) => {
        dispatch(deleteVariant(id, accessToken));
    }

    const columns = [
        {
            field: "id",
            headerName: "Variant ID",
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: "image",
            headerName: "Image",
            minWidth: 100,
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full">
                            <img draggable="false" src={params.row.image} alt='variant' className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                )
            },
        },
        {
            field: "color",
            headerName: "Color",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "size",
            headerName: "Size",
            minWidth: 150,
            flex: 0.4,
        },
        {
            field: "thickness",
            headerName: "Thickness",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "subcategory",
            headerName: "Subcategory",
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            headerAlign: "left",
            align: "left",
            minWidth: 70,
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.stock <= params.row.reorderLevel ? (
                                <span className="font-medium text-red-700 rounded-full bg-red-200 p-1 w-6 h-6 flex items-center justify-center">{params.row.stock}</span>
                            ) : (
                                <span className="">{params.row.stock}</span>
                            )
                        }
                    </>
                )
            },
        },
        {
            field: "productPrice",
            headerName: "Product Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span>{params.row.productPrice.toLocaleString()} د.ك</span>
                );
            },
        },
        {
            field: "salePrice",
            headerName: "Sale Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span>{params.row.salePrice.toLocaleString()} د.ك</span>
                );
            },
        },

        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.2,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"variant"} deleteHandler={deleteVariantHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    variants && variants.forEach((item) => {
        rows.unshift({
            id: item.id,
            image: item.variant_image,
            productPrice: item.product_price,
            salePrice: item.sale_price,
            stock: item.stock,
            color: item.color,
            size: item.size,
            thickness: item.thickness,
            subcategory: item.subcategory,
            reorderLevel: item.reorder_level
        });
    });

    return (
        <>
            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">variants</h1>
                <Link to={`/admin/new_variant/${productId}`} className="py-2 px-4 rounded shadow font-medium text-white bg-primary-darkBlue hover:shadow-lg">New Variant</Link>
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

export default VariantTable;