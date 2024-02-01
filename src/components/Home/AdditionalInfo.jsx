import customerServiveIcon from '../../assets/images/Plexi Media/customer-service.png'
import moneyIcon from '../../assets/images/Plexi Media/money.png'
import vanIcon from '../../assets/images/Plexi Media/van.png'

const AdditionalInfo = () => {

    const iconStyle = {
        width: "3.5rem",
        marginRight: '8px',
    };

    return (
        <section className="bg-white">
            <div className="w-full sm:w-9/12 px-1 m-auto flex justify-between items-center relative">
                <div className="flex flex-col items-center sm:flex-row">
                    <span className="flex items-center mb-2 sm:mb-0">
                        <img src={vanIcon} style={iconStyle} draggable="false" />
                    </span>
                    <span className="sm:ml-2">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center sm:flex-row  md:border-l md:border-gray-300 md:pl-20">
                    <span className="flex items-center mb-2 sm:mb-0">
                    <img src={customerServiveIcon} style={iconStyle} draggable="false" />
                    </span>
                    <span className="sm:ml-2">Dedicated Support</span>
                </div>
                <div className="flex flex-col items-center sm:flex-row  md:border-l md:border-gray-300 md:pl-20">
                    <span className="flex items-center mb-2 sm:mb-0">
                    <img src={moneyIcon} style={iconStyle} draggable="false" />
                    </span>
                    <span className="sm:ml-2">Money Back <br />Guarantee</span>
                </div>
            </div>
        </section>
    );
};

export default AdditionalInfo;
