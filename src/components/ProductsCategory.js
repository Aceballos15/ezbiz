import React, { useEffect, useState } from 'react'
import { formatNumber } from '../helpers/formatNumbers';
import { Products } from './Products';

export const ProductsCategory = ({category = '', setProductsCart, setSubtotal, setTotal, products, setProducts}) => {
    
    let URL_BASE = category !== '' ? "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora?max=10&where=Marca.Marca%3D%221hora%22%26%26Tipo.Nombre%3D%22" + category + "%22" : "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora?max=10&where=Marca.Marca%3D%221hora%22";

    const addProductCart = async(id) => {

        let URL_API = URL_BASE + '%26%26ID%3D' + id;
        let product_api = await fetch(URL_API);
        let product_data = await product_api.json();

        let total = 0;
        let subtotal = 0;
        
        console.log(product_data);

        let listCart = JSON.parse(localStorage.getItem('product'));

        product_data[0].quantity = 1;
        product_data[0].precio = parseInt(product_data[0].Precio_Mayorista);

        if (Array.isArray(listCart)) {
            

            let search_product = listCart.find(product => product.ID === id);

            if (!search_product) {

                listCart.push(product_data[0]);
    
                localStorage.setItem('product', JSON.stringify(listCart));
                setProductsCart(listCart);
            }

            listCart.map( product => {
                subtotal += product.precio;
                total += product.precio;
            });


        }else{
            localStorage.setItem('product', JSON.stringify([product_data[0]]));
            setProductsCart([product_data[0]]);
            subtotal += product_data[0].precio;
                total += product_data[0].precio;

        }

        setTotal(total);
        setSubtotal(subtotal);
        console.log(product_data);
    } 

  return (
    <>
        {products && products.length !== 0 && (
            products.map( product => {
                return(
                    <div className="col col-33" key={product.id} id={product.ID}>
                        <article className="products__card-product">
                            <div className="products__card-img">
                                <img src={product.Imagen_publica.url} alt=""/>
                            </div>
                            <div className="products__card-description">
                                <span className="products__type">{product.GrupoDeProductos.Description}</span>
                                <h3 className="products__title">{product.Referencia}</h3>
                                
                                <div className="products__cont-price-cart">
                                    <div className="products__cont-price">
                                        {/* Cambiar para mas adelante el precio del producto */}
                                        <span className="products__price">{formatNumber(product.Precio_Mayorista, true) } COP</span>
                                        <span className="products__price-before">$79.900 COP</span>
                                    </div>
                                    
                                </div>

                                
                            </div>

                            <div className="products__discounts">
                                <span>-37% OFF</span>
                            </div>

                            <div className="products__options">
                                <button className="btn btn-blue">Comprar</button>

                                <div className="products__add-product" id={product.ID} onClick={() => addProductCart(product.ID)}>
                                    <img src="./img/cart-product.png" alt="" />
                                </div>
                            </div>

                        </article>
                    </div>
                )
            })
        )}
    </>
  )
}
