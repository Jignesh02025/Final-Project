import React from 'react'
import './Breadcrump.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import toast from 'react-hot-toast'

function Breadcrump({ Product }) {
  if (!Product) {
    return toast.loading("Loading...")
  }

  return (  
    <div className='beadcrump'>
      HOME <img src={arrow_icon} alt="" /> 
      SHOP <img src={arrow_icon} alt="" /> 
      {Product.category} <img src={arrow_icon} alt="" /> 
      {Product.name}
    </div>
  )
}

export default Breadcrump
