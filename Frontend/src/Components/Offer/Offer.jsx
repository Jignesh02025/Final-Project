import React from 'react'
import './Offer.css'
import exclusive_image from '../Assets/exclusive_image.png'

function Offer() {
  return (
    <div className='offer'>
        <div className="offer-left">
          
            <h1>Exclusive</h1>
            <h1>Offer For You</h1>
            <p>ONLY ON BEST SELLING PRODUCTS</p>
            <button>Chech Now</button>
        </div>
        <div className="offer-right">
            <img src={exclusive_image} alt=""/>
        </div>
    </div>
  )
}

export default Offer