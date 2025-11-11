import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item'>
      <Link
        className='img-link'
        to={`/product/${props.id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <img src={props.image} alt={props.name} />
      </Link>

      <p>{props.name}</p>

      <div className="item-price">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>

      <Link to={`/product/${props.id}`}>
        {/* Example button */}
        {/* <button type="button" className="buy">Explore</button> */}
      </Link>
    </div>
  )
}

export default Item
