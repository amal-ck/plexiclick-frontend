
const OrderDetails = (order) => {

    const orderItems = order.order.order_items || [];

    return (
        <>
            <h1 className='text-center mt-20 font-semibold text-lg font-sans'>ORDER DETAILS</h1>
            <div>
                <div className="flex flex-row justify-between border-b font-semibold pb-2 font-sans">
                    <p>PRODUCT</p>
                    <p>TOTAL</p>
                </div>
                <div className="flex flex-col">
                    {orderItems.map((ord) => (
                        <div className="flex flex-row justify-between border-b py-4 text-sm items-center" key={ord.id}>
                            <div className="flex flex-col gap-3">
                                <p>{ord.product_name} × {ord.quantity}</p>
                                {ord.subcategory && <p>{ord.product_name}: {ord.subcategory}</p>}
                                {ord.color && <p>Color: {ord.color}</p>}
                                {ord.size && <p>Size: {ord.size}</p>}
                                {ord.thickness && <p>Thickness: {ord.thickness}</p>}
                            </div>
                            <div>
                                <p translate="no">{ord.total} د.ك</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row justify-between py-4 border-b">
                        <p>Subtotal:</p>
                        <p translate="no">{order.order.sub_total} د.ك</p>
                    </div>
                    <div className="flex flex-row justify-between py-4 border-b">
                        <p>Governorates: {order?.order?.billing_address?.governorates_name}:</p>
                        <p>{order?.order?.billing_address?.governorates_amount} د.ك</p>
                    </div>
                    <div className="flex flex-row justify-between py-4 border-b">
                        <p>Payment method:</p>
                        <p>Cash on delivery</p>
                    </div>
                    <div className="flex flex-row justify-between py-4 border-b font-semibold">
                        <p>Total:</p>
                        <p>{order.order.order_total} د.ك</p>
                    </div>
                    {order.order.notes &&
                        <div className="flex flex-row justify-between py-4 border-b">
                            <p>Note:</p>
                            <p>{order.order.notes}</p>
                        </div>
                    }
                </div>
                <div className='flex sm:flex-row flex-col gap-5 justify-between mt-24 font-sans italic'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-xl  border-b pb-5'>Billing Address</h1>
                        <p translate="no">{order?.order?.billing_address?.first_name}</p>
                        <p translate="no">{order?.order?.billing_address?.last_name}</p>
                        <p translate="no">{order?.order?.billing_address?.house_no_street_name}</p>
                        <p translate="no">{order?.order?.billing_address?.apartment}</p>
                        <p translate="no">{order?.order?.billing_address?.town_or_city}</p>
                        <p translate="no">{order?.order?.billing_address?.post_code_zip}</p>
                        <p>Governorates: {order?.order?.billing_address?.governorates_name}</p>
                        <p translate="no">{order?.order?.billing_address?.phone_no}</p>
                        <p translate="no">{order?.order?.billing_address?.email}</p>
                    </div>
                    {order?.order?.shipping_address?.first_name &&
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-xl border-b pb-5'>Shipping Address</h1>
                            <p translate="no">{order?.order?.shipping_address?.first_name}</p>
                            <p translate="no">{order?.order?.shipping_address?.last_name}</p>
                            <p translate="no">{order?.order?.shipping_address?.house_no_street_name}</p>
                            <p translate="no">{order?.order?.shipping_address?.apartment}</p>
                            <p translate="no">{order?.order?.shipping_address?.town_or_city}</p>
                            <p translate="no">{order?.order?.shipping_address?.post_code_zip}</p>
                            <p translate="no">{order?.order?.shipping_address?.company_name}</p>
                        </div>}

                </div>
            </div>
        </>
    );
};

export default OrderDetails;
