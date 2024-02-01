import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { AdminContactAction, clearErrors, deleteContact, deleteUser, getAllUsers } from '../../actions/userAction';
import { DELETE_CONTACT_RESET, DELETE_USER_RESET } from '../../constants/userConstants';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const MessageTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const accessToken = localStorage.getItem('access')

    const { contactUs=[], error, loading, isDeleted, error: deleteError } = useSelector((state) => state.contactUs);

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
            enqueueSnackbar("Contact Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_CONTACT_RESET });
        }
        dispatch(AdminContactAction(accessToken));
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar, accessToken]);

    const deleteUserHandler = (id) => {
        dispatch(deleteContact(id, accessToken));
    }

    const columns = [
        {
            field: "id",
            headerName: "Message ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 0.2,
        },
        {
            field: "message",
            headerName: "Message",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 200,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"messages"} deleteHandler={deleteUserHandler} id={params.row.id} name={params.row.name} />
                );
            },
        },
    ];

    const rows = [];

    contactUs && contactUs.forEach((item) => {
        rows.unshift({
            id: item.id,
            name: item.name,
            email: item.email,
            message: item.message,
        });
    });

    return (
        <>
            <MetaData title="Admin Messages | PLexiClick" />

            {loading && <BackdropLoader />}

            <h1 className="text-lg font-medium uppercase">messages</h1>
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

export default MessageTable;