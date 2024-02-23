import React, { useState } from 'react'
import {BrowserRouter, Navigate, NavLink, Route, Routes} from "react-router-dom"
import { Products } from '../components/Products'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Cart } from '../components/Cart'

export const MainRouter = () => {
    const [productsCart, setProductsCart] = useState([]);

    return (
      <BrowserRouter>
  
          <Header />
  
          <main>
              <Routes>
                  <Route path='/' element={<Products setProductsCart={setProductsCart} />} />
              </Routes>
          </main>
  
          <Footer />
          <Cart productsCart={productsCart} setProductsCart={setProductsCart} />
  
      </BrowserRouter>
  
         
    )
}
