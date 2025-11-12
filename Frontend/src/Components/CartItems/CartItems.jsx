import React, { useContext, useEffect, useState } from 'react';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useAuth } from '../../Context/Authuser';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ShopContext } from '../../Context/ShopContext';

const CartItems = () => {
    const [cartTotal, setCartTotal] = useState();
    const [user] = useAuth();
    const navigate = useNavigate();
    const cUser = user?.user?._id;
    const { removefromcart, cartdata, setCartdata, qut, Backend_Url } = useContext(ShopContext);

    useEffect(() => {
        const getcartdata = async () => {
            if (!cUser) return;
            try {
                const res = await axios.get(`${Backend_Url}CartCollection/${cUser}`);
                setCartdata(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getcartdata();
    }, [cUser, setCartdata, Backend_Url]);

    useEffect(() => {
        const getCartTotal = async () => {
            if (!cUser) return;
            try {
                const res = await axios.get(`${Backend_Url}CartCollection/${cUser}`);
                let totalAmount = res.data.reduce((sum, item) => sum + item.total, 0);
                setCartTotal(totalAmount);
            } catch (error) {
                console.log(error);
            }
        };
        getCartTotal();
    }, [qut, cUser, Backend_Url]);

    const handleCheckout = async () => {
        if (!cartTotal || cartTotal <= 0) {
            alert("Cart is empty!");
            return;
        }
        try {
            const Amount = Math.round(cartTotal * 100);
            const res = await axios.post(`${Backend_Url}create-checkout-session`, {
                Amount: Amount,
                user_id: cUser,
            });
            window.location.href = res.data.url;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="cartitem">
            <div className="cartitem-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {Array.isArray(cartdata) && cartdata.length > 0 ? (
                cartdata.map((e) => (
                    <div key={e._id}>
                        <div className="cartitem-format cartitem-format-main">
                            <img
                                src={e.image}
                                className="cartitem-product-icon"
                                alt=""
                                onClick={() => navigate(`/product/${e.product_id}`)}
                            />
                            <p>{e.title}</p>
                            <p>${e.price}</p>
                            <button className="cartitem-quantity">{e.qut}</button>
                            <p>${e.total}</p>
                            <img
                                className="cartitem-remove-icon"
                                src={remove_icon}
                                onClick={() => removefromcart(e)}
                                alt=""
                            />
                        </div>
                        <hr />
                    </div>
                ))
            ) : (
                <div className="empty-cart">
                    <p>Your cart is empty!</p>
                    <button onClick={() => navigate('/')}>CONTINUE SHOPPING</button>
                </div>
            )}

            <div className="cartitem-down">
                <div className="cartitem-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitem-total-item">
                            <p>Subtotal</p>
                            <p>${cartTotal}</p>
                        </div>
                        <hr />
                        <div className="cartitem-total-item">
                            <p>Shopping Fee</p>
                            <p>Fee</p>
                        </div>
                        <hr />
                        <div className="cartitem-total-item">
                            <p>Total</p>
                            <p>${cartTotal}</p>
                        </div>
                    </div>
                </div>

                <div className="cartitem-promocode">
                    <p>If You Have Any Promocode, Enter It Here</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder="PromoCode" />
                        <button className="submit-btn">Submit</button>
                    </div>
                </div>
            </div>

            <div className="btn-container">
                <button className="checkout-btn" onClick={handleCheckout}>
                    PROCEED TO CHECKOUT
                </button>
            </div>
        </div>
    );
};

export default CartItems;
