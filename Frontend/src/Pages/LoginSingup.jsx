import React, { useContext } from 'react'
import './Css/LoginSingup.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ShopContext } from '../Context/ShopContext'

const LoginSingup = () => {
  const { Backend_Url } = useContext(ShopContext);

  const onSubmit = (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const userInfo = {
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    axios.post(`${Backend_Url}user/Singup`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
        }
        window.location.reload();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error(err.response.data.message)
        }
      });
  };

  return (
    <div className='loginSingup'>
      <div className="loginSingup-container">
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div className="loginSingup-fields">
            <input type="text" name="fullname" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Email Address" required />
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <button type="submit">Continue</button>
          <p className='loginSignup-login'>
            Already Have An Account? <span><Link to='/Login'>Log-in</Link></span>
          </p>
          <div className="loginSingup-agree">
            <input type="checkbox" required />
            <p>By Continuing, I Agree To The Terms Of Use & Privacy Policy.</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginSingup
