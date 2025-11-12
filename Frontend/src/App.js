import './App.css';
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/cart'
import LoginSingup from './Pages/LoginSingup'
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import Login from './Pages/Login';
import  { Toaster } from 'react-hot-toast';
import { useAuth } from './Context/Authuser';

function App() {
  const [user] = useAuth()
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={user?<Cart />:<Navigate to={"/loginSingup"}/>} />
          <Route path='/loginSingup' element={<LoginSingup />} />
          <Route path='/login' element={<Login />}/>
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
