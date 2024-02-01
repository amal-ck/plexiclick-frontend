 import React from "react";
import box from '../../../assets/images/Plexi Media/imageInBanner.png'
import ProductSlider from "./ProductSlider";
import MetaData from "../../Layouts/MetaData";

const AboutUs = () =>{
    return(
        <>
        <MetaData title="About US | Plexi Click" />
        <div className="flex flex-row w-8/12 m-auto justify-between items-center font-serif mt-10">
            <h1 className="text-pink-500 sm:text-5xl text-xl font-semibold font-serif">Who we are ?</h1>
            <img src={box} draggable='false' className="sm:w-52 w-20" alt=""/>
        </div>
        <div className="w-10/12 m-auto justify-between item-center text-md sm:text-2xl mt-10 font-serif">
            <p>Being in the industry since 2012, "Plexi Click" by making use of the most prominent and advanced
               machinery and unmatched expertise in designing, engraving, cutting and crafting promise to provide
               the best in the pioneering sector of acrylic with a varied range of products useful in multiple areas.
            </p><br/>
            <p>We as a team, ensures the quality in designs and subject our production to satisfy the needs of the customers.</p>
        </div>
        <div className="flex justify-center py-20 text-pink-500 sm:text-4xl text-xl font-semibold font-serif">
            <h1>Some of our Products</h1>
        </div>
        <ProductSlider />
        </>
    )
}
export default AboutUs;