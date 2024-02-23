import React, { useState } from 'react'
import {BrowserRouter, Navigate, NavLink, Route, Routes} from "react-router-dom"
import { Products } from '../components/Products'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Cart } from '../components/Cart'

export const MainRouter = () => {
    const [productsCart, setProductsCart] = useState([]);
    const [subtotal, setSubtotal] = useState("");
    const [total, setTotal] = useState("");

    return (
      <BrowserRouter>
  
          <Header />
  
          <main>
              <Routes>
                  <Route path='/' element={<Products setProductsCart={setProductsCart} setSubtotal={setSubtotal} setTotal={setTotal} />} />
              </Routes>
          </main>
  
          <Footer />
          <Cart productsCart={productsCart} setProductsCart={setProductsCart} subtotal={subtotal} setSubtotal={setSubtotal} total={total} setTotal={setTotal} />
  
      </BrowserRouter>
  
         
    )
}
