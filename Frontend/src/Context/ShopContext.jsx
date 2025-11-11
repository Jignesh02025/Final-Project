import axios from "axios";
import { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product";
import { useAuth } from "./Authuser"; // assuming you have this
import toast from "react-hot-toast";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
    const [cartdata, setCartdata] = useState([])
    const [qut, setQut] = useState(0);
    const [user] = useAuth(); 
    const currentuser = user?.user?._id;
    const Backend_Url = "e-comm-backend-gilt.vercel.app";
    
    const addtocart = async (product) => {
        const cart = {
            product_id: product.id,
            user_id: currentuser,
            image: product.image,
            title: product.name,
            price: product.new_price
        }
        axios.post(`${Backend_Url}CartCollection/cart`, cart)
        .then((res) => {
            if (res) {
                    getTotalCartItems();
                    toast.success(res.data.message)
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.message)
                }
            })
    };

    const removefromcart =async (e)=>{
        axios.post(`${Backend_Url}CartCollection/removecart`,e)
        .then((res)=>{
            getTotalCartItems();
            toast.success(res.data.message)
            setCartdata(res.data.cart || [])
        })
        .catch((e)=>{
            toast.error(e.message)
        })
    } 


    useEffect(() => {
       getTotalCartItems();
    }, [])
    
    // ✅ Total cart count
    const getTotalCartItems = async () => {
        if (!currentuser) return;
        try {
            const res = await axios.get(`${Backend_Url}CartCollection/${currentuser}`)
            let totalqut =  res.data.reduce((sum, item) => sum + item.qut, 0);
            setQut(totalqut)
            return qut;
        } catch (error) {
            console.log(error.message)
            return 0;
        }
    };
    const contextValue = {
        all_product: all_product || [],
        qut,removefromcart,cartdata,setCartdata,qut,
        addtocart,Backend_Url,
        getTotalCartItems,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
