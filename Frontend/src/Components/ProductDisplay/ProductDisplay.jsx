import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';
import { useAuth } from '../../Context/Authuser';
import { useNavigate } from "react-router-dom";

function ProductDisplay({ Product }) {
  const [user] = useAuth();
  const { addtocart } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!Product) {
    return <div className="productdisplay">Product not found</div>;
  }

  const handleLoginRedirect = () => {
    navigate('/loginSingup');
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-image-list">
          <img src={Product.image} alt="" />
          <img src={Product.image} alt="" />
          <img src={Product.image} alt="" />
          <img src={Product.image} alt="" />
        </div>
        <div className="productdisplay-image">
          <img className='productdisplay-main-image' src={Product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{Product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-prices-old">${Product.old_price}</div>
          <div className="productdisplay-right-prices-new">${Product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        {user ? (
          <button onClick={() => addtocart(Product,Product._id)}>ADD TO CART</button>
        ) : (
          <button onClick={handleLoginRedirect}>ADD TO CART</button>
        )}

        <p className='productdisplay-right-category'>
          <span>Category :</span> {Product.category}
        </p>
        <p className='productdisplay-right-category'>
          <span>Tags :</span> Modern, Latest
        </p>
      </div>
    </div>
  )
}

export default ProductDisplay
