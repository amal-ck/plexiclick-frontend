const CheckoutSidebar = ({ cartItems, handlePlaceOrder, selectedGovernorateInfo, total}) => {

    return (
        <>
            <div className="bg-gray-100 sm:p-10 p-5 font-sans">
                <div className="flex flex-row justify-between border-b font-semibold pb-2">
                    <p>PRODUCT</p>
                    <p>SUBTOTAL</p>
                </div>
                <div className="flex flex-col">
                    {cartItems.map((cart) => (
                        <div className="flex flex-row justify-between border-b py-4 text-sm items-center">
                            <div className="flex flex-col gap-1">
                                <p>{cart.product_name} × {cart.quantity}</p>
                                {cart.subcategory && <p>{cart.product_name}: {cart.subcategory}</p>}
                                {cart.color && <p>Color: {cart.color}</p>}
                                {cart.size && <p>Size: {cart.size}</p>}
                                {cart.thickness && <p>Thickness: {cart.thickness}</p>}
                            </div>
                            <div>
                                <p className="text-primary-darkBlue">{cart.sub_total} د.ك</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row justify-between py-2 border-b">
                        <p>Subtotal</p>
                        <p className="text-primary-darkBlue">{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(3)} د.ك</p>
                    </div>
                    <div className="flex flex-row justify-between py-2 border-b">
                        <p>Governorates: {selectedGovernorateInfo ? selectedGovernorateInfo.governorates_name : ''}</p>
                        <p className="text-primary-darkBlue">{selectedGovernorateInfo ? selectedGovernorateInfo.governorates_amount : ''} د.ك</p>
                    </div>
                    <div className="flex flex-row justify-between py-5 border-b text-xl">
                        <p>Total</p>
                        <p className="text-primary-darkBlue font-semibold">{total} د.ك</p>
                    </div>
                </div>
                <div className="py-4">
                    <p className="font-semibold">Cash on delivery</p>
                    <div className="bg-gray-300 p-4 mt-4">
                        <p>Pay with cash upon delivery.</p>
                    </div>
                    <p className="mt-4">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                    </p>
                    <button onClick={handlePlaceOrder} className='bg-primary-darkBlue w-full p-3 font-semibold mt-16 rounded-3xl text-white text-center hover:bg-black'>Place Order</button>
                </div>
            </div>
        </>

    )
}

export default CheckoutSidebar;