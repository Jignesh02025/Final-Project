import React, { useContext, useEffect, useState } from 'react'
import './Css/ShopCategory.css'
// import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import { ShopContext } from '../Context/ShopContext'

function ShopCategory(props) {
  const {Backend_Url} = useContext(ShopContext);
  const [data, setdata] = useState([])
  useEffect(() => {
    const getdata = async() =>{
      try {
        const res = await axios.get(`${Backend_Url}data`)
        setdata(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
  }, [Backend_Url])
  
  return (
    <div className='shop-category'>
      <div className="banner-cotainer">
        <img className='ShopCategory-banner' src={props.banner} alt="" />
      </div>
        <div className="ShopContegory-indexSort">
          <p>
            <span>Showing 1-12</span> Out Of 36 Products
          </p>
          <div className="ShopCategory-sort">
            Sort By <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="ShopCategory-Products">
          <div className="items-container">

          {data.map((item,i)=>{
            if(props.category===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
              return null;
            }
          })}
          </div>
        </div>
        <div className="ShopCategory-loadmore">
          Explore More
        </div>
    </div>    
  )
}

export default ShopCategory