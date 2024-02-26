
import React, { useEffect, useState } from 'react'
import {BrowserRouter, Navigate, NavLink, Route, Routes} from "react-router-dom"
import { Products } from '../components/Products'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Cart } from '../components/Cart'
import { ProductsCategory } from '../components/ProductsCategory'

export const MainRouter = () => {   

    const URL_BASE_GROUP = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/GrupoDeProductos_Report?where=ID%3D1889220000051935384";
   
    const [productsCart, setProductsCart] = useState([]);
    const [subtotal, setSubtotal] = useState("");
    const [total, setTotal] = useState("");

    const [groupProducts, setGroupProducts] = useState([]);
    const [products, setProducts] = useState("");
    //Cargar los productos de 1 hora desde la API
    useEffect( () => {
        const getGroupProductsAPI = async() => {
            const group_products_api = await fetch(URL_BASE_GROUP);
    
            const group_products_data = await group_products_api.json();

            setGroupProducts(await group_products_data);
        }
   
        getGroupProductsAPI();

    },[]);


    return (
      <BrowserRouter>
  
          <Header total={total} products={products} setProducts={setProducts}/>
  
          <main>
              <Routes>
                  <Route path='/' element={<Products  groupProducts={groupProducts} />} >
                        <Route path='/' element={<ProductsCategory setProductsCart={setProductsCart} setSubtotal={setSubtotal} setTotal={setTotal} search="true" products={products} setProducts={setProducts} />}/>
                        { groupProducts && groupProducts.length !== 0 && (
                            groupProducts.map( group => {
                                return (
                                    <>
                                        <Route path={group.Description} element={<ProductsCategory id={group.ID} setSubtotal={setSubtotal} setTotal={setTotal}  products={products} setProducts={setProducts}/>} />
                                    </>
                                )
                            } )
                        ) }

                        
                        
                    </Route>
              </Routes>
          </main>
  
          <Footer />
          <Cart productsCart={productsCart} setProductsCart={setProductsCart} subtotal={subtotal} setSubtotal={setSubtotal} total={total} setTotal={setTotal} />
  
      </BrowserRouter>
  
         
    )
}
