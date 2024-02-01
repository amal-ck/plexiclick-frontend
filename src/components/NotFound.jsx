import { Link } from 'react-router-dom';
import MetaData from './Layouts/MetaData';

const NotFound = () => {
    return (
        <>
        <MetaData title = "Page not found | Plexi Click" />
        <div className="mt-44 flex flex-col gap-4 items-center text-center h-screen">
            <p className="text-xl leading-8 text-gray-600 mb-5">Opps! The page you are looking for <br/> is missing for some reasons. Please <br/> come back to homepage</p>
            <Link to="/" className="px-4 py-2 bg-primary-darkBlue uppercase shadow hover:shadow-lg text-white rounded-3xl">Back To Home</Link>
        </div>
        </>
    );
};

export default NotFound;
