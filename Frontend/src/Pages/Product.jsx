import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';  
import { ShopContext } from '../Context/ShopContext';
import Breadcrump from '../Components/Breadcrump/Breadcrump';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
function Product() {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const Product =all_product.find((e) => e.id.toString() === productId);
    const [category, setCategory] = useState([])

    useEffect(() => {
    }, [category])
    
    return (
        <div>
            <Breadcrump Product={Product}/>
            <ProductDisplay Product={Product}/>
            <DescriptionBox/>
            {/* <RelatedProducts/> */}
        </div>
    )
}

export default Product