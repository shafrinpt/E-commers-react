import React from 'react'
import {Route, BrowserRouter as Router, Routes,} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Perfume from './pages/Perfume'
import Makeup from './pages/Makeup'
import Skincare from './pages/Skincare'

const App = () => {
  return (
   <Router>
     <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
         <Route path='/Products' element={<Products/>} />
         <Route path='/Perfume' element={<Perfume/>} />
         <Route path='/Makeup' element={<Makeup/>} />
         <Route path='/Skincare' element={<Skincare/>} />
           <Route path='/products/:id' element={<ProductDetails/>} />
             <Route path='/cart' element={<Cart/>} />
      </Routes>
      <Footer />
   </Router>
  )
}

export default App