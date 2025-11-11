import React, { useContext } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offer from '../Components/Offer/Offer'
import NewCollection from '../Components/NewCollections/NewCollections'
import Newletter from '../Components/NewsLetter/NewLetter'
import { useAuth } from '../Context/Authuser'
const Shop = () => {
  const [user,setUser] = useAuth()
  return (
    <>
    <Hero/>
    <Popular/>
    <Offer/>
    <NewCollection/>  
    <Newletter/> 

    </>
  )
}

export default Shop