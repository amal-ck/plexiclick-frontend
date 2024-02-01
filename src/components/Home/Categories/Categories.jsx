import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllCategories } from "../../../actions/productAction";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import BackdropLoader from "../../Layouts/BackdropLoader";

const Categories = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { category=[], loading, error } = useSelector((state) => state.category);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getAllCategories());
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <div className="flex flex-wrap sm:w-10/12 m-auto">
            {loading && <BackdropLoader />}
            {category.length === 0 ? (
                <p>No categories available</p>
            ) : (
                category.map((el) => (
                    <Link to={`/products/${el.category_name}`} key={el.id} className="md:w-1/2 lg:w-1/3 w-1/1 p-4">
                        <div
                            className={
                                'relative rounded-lg lg:flex lg:flex-row transform transition-transform hover:-translate-y-2'
                            }
                        >
                            <img
                                src={el.category_image}
                                alt={el.category_name}
                                className='w-full h-full object-cover rounded-lg'
                                draggable='false'
                            />
                            <div className='absolute inset-0 flex flex-col items-start m-5 top-8 justify-center'>
                                <h2 className="text-xl font-serif text-white font-semibold">{el.category_name}</h2>
                                <p className='text-white'>View All</p>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default Categories;
