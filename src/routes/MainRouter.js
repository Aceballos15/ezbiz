
import React, { useEffect, useState } from 'react'
import {BrowserRouter, Navigate, NavLink, Route, Routes} from "react-router-dom"
import { Products } from '../components/Products.js'
import { Header } from '../components/layout/Header.js'
import { Footer } from '../components/layout/Footer.js'
import { Cart } from '../components/Cart.js'
import { ProductsCategory } from '../components/ProductsCategory.js'
import { DetailProducts } from '../components/DetailProducts.js'

export const MainRouter = () => {   

    //const URL_BASE_GROUP = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/GrupoDeProductos_Report?where=ID%3D1889220000051935384";
    const URL_BASE = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora?where=Marca.Marca%3D%221hora%22";

    const [productsCart, setProductsCart] = useState(false);
    const [iva, setIva] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const [total, setTotal] = useState("");

    const [groupProducts, setGroupProducts] = useState([]);
    const [products, setProducts] = useState(false);


    const [currentPage, setCurrentPage] = useState(1);
    const [productDetail, setProductDetail] = useState("");


    //Cargar los productos de 1 hora desde la API
    useEffect( () => {
        const getGroupProductsAPI = async() => {
            const group_products_api = await fetch(URL_BASE);
    
            const group_products_data = await group_products_api.json();

            let categories = [];
            group_products_data.map(group => {
                categories.push(group.Tipo.Nombre);
            });

            categories = [...new Set(categories)];
            setGroupProducts(categories);
        }
   
        getGroupProductsAPI();

        const getProductsAPI = async() => {
            const products_api = await fetch(URL_BASE);

            const products_data = await products_api.json();
            
            setProducts(await products_data);    
        }

        getProductsAPI();

    },[]);


    return (
      <BrowserRouter>
  
          <Header total={total} products={products} setProducts={setProducts} setCurrentPage={setCurrentPage}/>
  
          <main>
              <Routes>
                  <Route path='/' element={<Products  groupProducts={groupProducts} setCurrentPage={setCurrentPage} />} >
                        <Route path='/' element={<ProductsCategory productsCart={productsCart} setProductsCart={setProductsCart} setIva={setIva} setSubtotal={setSubtotal} setTotal={setTotal} search="true" products={products} setProducts={setProducts} currentPage={currentPage} setCurrentPage={setCurrentPage} setProductDetail={setProductDetail}/>}/>
                        { groupProducts && groupProducts.length !== 0 && (
                            groupProducts.map( group => {
                                let new_products = [];
                                
                                products.map(product => {
                                    if (product.Tipo.Nombre === group) {
                                        new_products.push(product);
                                    }
                                });

                                return (
                                    <>
                                        <Route path={group} element={<ProductsCategory category={group} productsCart={productsCart} setProductsCart={setProductsCart} setIva={setIva} setSubtotal={setSubtotal} setTotal={setTotal}  products={new_products} setProducts={setProducts} currentPage={currentPage} setCurrentPage={setCurrentPage} setProductDetail={setProductDetail}/>} />
                                    </>
                                )
                            } )
                        ) }   
                    </Route>
              </Routes>
          </main>

          <Footer />
          <Cart productsCart={productsCart} setProductsCart={setProductsCart} iva={iva} setIva={setIva} subtotal={subtotal} setSubtotal={setSubtotal} total={total} setTotal={setTotal} />
          <DetailProducts productsCart={productsCart} productDetail={productDetail} setProductsCart={setProductsCart} setIva={setIva} setSubtotal={setSubtotal} setTotal={setTotal}/>

      </BrowserRouter>
  
         
    )
}
