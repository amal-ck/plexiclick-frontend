import { useEffect } from 'react';
import Chart from 'chart.js/auto'
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { getAdminVariants } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import MetaData from '../Layouts/MetaData';
import WarningStock from './WarningStock';

const MainData = () => {

    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('access')

    const { variants=[] } = useSelector((state) => state.variants);
    const { orders=[] } = useSelector((state) => state.allOrders);
    const { users=[] } = useSelector((state) => state.users);

    let outOfStock = 0;
    let warningStock = 0;

    variants?.forEach((item) => {
        if (item.stock <= item.reorder_level) {
            warningStock += 1;
        }
    });

    variants?.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminVariants(accessToken));
        dispatch(getAllOrders(accessToken));
        dispatch(getAllUsers(accessToken));
    }, [dispatch]);

    let totalAmount = orders?.reduce((total, order) => total + parseFloat(order.total_amount), 0.000);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date();
    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Sales in ${date.getFullYear() - 2}`,
                borderColor: '#8A39E1',
                backgroundColor: '#8A39E1',
                data: months.map((m, i) => orders?.filter((od) => new Date(od.created_at).getMonth() === i && new Date(od.created_at).getFullYear() === date.getFullYear() - 2).reduce((total, od) => total + parseFloat(od.total_amount), 0)),
            },
            {
                label: `Sales in ${date.getFullYear() - 1}`,
                borderColor: 'orange',
                backgroundColor: 'orange',
                data: months.map((m, i) => orders?.filter((od) => new Date(od.created_at).getMonth() === i && new Date(od.created_at).getFullYear() === date.getFullYear() - 1).reduce((total, od) => total + parseFloat(od.total_amount), 0)),
            },
            {
                label: `Sales in ${date.getFullYear()}`,
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
                data: months.map((m, i) => orders?.filter((od) => new Date(od.created_at).getMonth() === i && new Date(od.created_at).getFullYear() === date.getFullYear()).reduce((total, od) => total + parseFloat(od.total_amount), 0)),
            },
        ],
    };

    const statuses = ['processing', 'ready for dispatch', 'dispatched', 'delivered'];

    const pieState = {
        labels: statuses,
        datasets: [
            {
                backgroundColor: ['#9333ea', '#ef4444', '#facc15', '#4ade80'],
                hoverBackgroundColor: ['#a855f7', '#dc2626', '#fde047', '#86efac'],
                data: statuses.map((status) => orders?.filter((item) => item.order_status === status).length),
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'Reorder Level', 'In Stock'],
        datasets: [
            {
                backgroundColor: ['#ef4444', '#facc15', '#22c55e'],
                hoverBackgroundColor: ['#dc2626', '#fde047', '#16a34a'],
                data: [outOfStock, warningStock, variants.length - outOfStock],
            },
        ],
    };

    return (
        <>
            <MetaData title="Admin Dashboard | PlexiClick" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
                <div className="flex flex-col bg-purple-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Sales Amount</h4>
                    <h2 className="text-2xl font-bold"  translate="no">{totalAmount?.toFixed(3)} د.ك</h2>
                </div>
                <div className="flex flex-col bg-red-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Orders</h4>
                    <h2 className="text-2xl font-bold"  translate="no">{orders?.length}</h2>
                </div>
                <div className="flex flex-col bg-yellow-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Product Variants</h4>
                    <h2 className="text-2xl font-bold"  translate="no">{variants?.length}</h2>
                </div>
                <div className="flex flex-col bg-green-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Users</h4>
                    <h2 className="text-2xl font-bold"  translate="no">{users?.length}</h2>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full">
                <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
                    <Line data={lineState} />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <span className="font-medium uppercase text-gray-800">Order Status</span>
                    <Pie data={pieState} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full mb-6">

                <WarningStock />
                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <span className="font-medium uppercase text-gray-800">Stock Status</span>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </>
    );
};

export default MainData;
