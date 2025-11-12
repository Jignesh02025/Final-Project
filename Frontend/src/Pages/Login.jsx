import React, { useContext } from 'react'
import './Css/LoginSingup.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ShopContext } from '../Context/ShopContext'

const Login = () => {
  const naviagate = useNavigate();
  const {Backend_Url} = useContext(ShopContext);
  const onSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target)
    const userInfo = {
      email: formdata.get('email'),
      password: formdata.get('password'),
    };
    axios.post(`${Backend_Url}user/Login`, userInfo)
      .then((res) => {
        if (res) {
          toast.success("User Logged in Successfully")
        }
        localStorage.setItem('user',JSON.stringify(res.data))
        naviagate('/');
        naviagate(0);
      }).catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message)
        }
      })
  }
  return (
    <div className='loginSingup'>
      <div className="loginSingup-container">
        <h1>Log-in</h1>
        <form onSubmit={onSubmit}>
          <div className="loginSingup-fields">
            <input type="email" name="email" placeholder="Email Address" required />
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <button type="submit">Login</button>
          <p className='loginSignup-login'>
            Don’t Have An Account? <span><Link to='/loginSingup'>Sign Up</Link></span>
          </p>
          <div className="loginSingup-agree">
            <input type="checkbox" required/>
            <p>Remember Me</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login