import React from 'react'
import './NewLetter.css'
function NewLetter() {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe To Our Newletter And Stay Updated</p>
        <div>
            <input type="email" placeholder='Your Email Id' name="" id="" />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewLetter