import React, { useContext, useEffect, useState } from 'react'
import './Popular.css'
import axios from 'axios'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const Popular = () => {
  const [Data, setData] = useState([])
  const [current, setCurrent] = useState(0)
  const {Backend_Url} = useContext(ShopContext)
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(`${Backend_Url}data`)
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getdata()
  }, [Backend_Url])

  const next = () => {
    setCurrent((prev) => (prev + 1) % Data.length)
  }

  const prev = () => {
    if (Data.length > 0) {
      setCurrent((prev) => (prev - 1 + Data.length) % Data.length)
    }
  }

  return (
    <div className='popular'>
      <h1>POPULAR IN WEEK</h1>
      <hr />
      <div className="slider-container">

        {/* navigation buttons */}
        <div className="prev" onClick={prev}>◀</div>

        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${current * 100}%)`
          }}
        >
          {Data.map((item, i) => (
            <div className="slide" key={i}>
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </div>
          ))}
        </div>

        <div className="next" onClick={next}>▶</div>
      </div>
    </div>
  )
}

export default Popular
