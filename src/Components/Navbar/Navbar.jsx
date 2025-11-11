import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router'
import { ShopContext } from '../../Context/ShopContext'
import Authuser, { useAuth } from '../../Context/Authuser'
import toast from 'react-hot-toast'
function Navbar() {
    const [user,setUser] = useAuth()
    const [menu,setMenu] = useState("shop")
    const {gettotalcartnumber} = useContext(ShopContext);
    const navigate = useNavigate();
    const handlelogout = () =>{
        try {
            setUser({
                ...user,
                user:null,
            })
            localStorage.clear()
            toast.success("User Logout")
            console.log("Logout")
            navigate(0);
        } catch (error) {
            toast.error("Error: "+error.message)
        }
    }
  return (
    <div>
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("men")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("women")}}><Link style={{textDecoration: 'none'}} to='/women'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link style={{textDecoration: 'none'}} to='./login'><button>
                    {
                        user?<span onClick={handlelogout}>Logout</span>:<span>Login</span>
                    }
                    </button></Link>
                <Link style={{textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{gettotalcartnumber()}</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar