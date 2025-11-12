import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router'
import { ShopContext } from '../../Context/ShopContext'
import { useAuth } from '../../Context/Authuser'
import toast from 'react-hot-toast'
function Navbar() {
    const [user, setUser] = useAuth()
    const [menu, setMenu] = useState("shop")
    const { qut } = useContext(ShopContext);
    const navigate = useNavigate();
    const [isOpen, setisOpen] = useState(false)

    const handlelogout = () => {
        try {
            setUser({
                ...user,
                user: null,
            })
            localStorage.clear()
            toast.success("User Logout")
            console.log("Logout")
            navigate(0);
        } catch (error) {
            toast.error("Error: " + error.message)
        }
    }

    const gotohomepage = () => {
        navigate('/')
    }
    return (
        <div>
            <div className={`sidenav-menu ${isOpen ? "open" : ""}`} >
                <div onClick={() => setisOpen(false)} className={`close ${isOpen ? "open" : ""}`}>X</div>
                <li onClick={() => { setMenu("shop") }}><Link onClick={() => setisOpen(false)} className='link' style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("men") }}><Link onClick={() => setisOpen(false)} className='link' style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "men" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("women") }}><Link onClick={() => setisOpen(false)} className='link' style={{ textDecoration: 'none' }} to='/women'>Women</Link>{menu === "women" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link onClick={() => setisOpen(false)} className='link' style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </div>
            <div className="navbar">
                <img onClick={() => setisOpen(!isOpen)} className='sidebar' src="sidebar.png" alt="" />
                <div className="nav-logo">
                    <img onClick={gotohomepage} src={logo} alt="" />
                    <p onClick={gotohomepage}>SHOPPER</p>
                </div>
                <div className="nav-right">
                    <div className='nav-menu'>
                        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                        <li onClick={() => { setMenu("men") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "men" ? <hr /> : <></>}</li>
                        <li onClick={() => { setMenu("women") }}><Link style={{ textDecoration: 'none' }} to='/women'>Women</Link>{menu === "women" ? <hr /> : <></>}</li>
                        <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
                    </div>
                    <div className="nav-login-cart">
                        <Link style={{ textDecoration: 'none' }} to='./login'><button>
                            {
                                user ? <span onClick={handlelogout}>Logout</span> : <span>Login</span>
                            }
                        </button></Link>
                        <Link className='cardicon' style={{ textDecoration: 'none' }} to='/cart'><img src={cart_icon} alt="" />
                            <div className="nav-cart-count">{qut}</div>
                        </Link>
                    </div>
                </div>
            </div>
            {isOpen && <div className="overlay" onClick={() => setisOpen(false)}></div>}
        </div>
    )
}

export default Navbar