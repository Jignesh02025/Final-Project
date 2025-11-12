import React, { useContext, useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';
import axios from 'axios';
import { ShopContext } from '../../Context/ShopContext';

const NewCollections = () => {
  const [Data, setData] = useState([]);
  const { Backend_Url } = useContext(ShopContext);

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(`${Backend_Url}data`);
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getdata();
  }, [Backend_Url]); 

  return (
    <div className="new-collection">
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collection">
        {Data.filter((item) => item.id <= 5).map((item, i) => (
          <Item
            key={item.id || i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
