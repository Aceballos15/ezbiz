import React, { useEffect, useState } from 'react'
import { formatNumber } from '../../helpers/formatNumbers';

export const Header = ({total, products, setProducts}) => {

    //const [searchProduct, setSearchProduct] = useState('');
    const [listProducts, setListProducts] = useState([]);

  // Abrir la sección del carrito 
  const openCart = () => {

    const cart = document.querySelector("#cart");
    const trama = document.querySelector(".trama");

    cart.classList.add("open-cart");
    trama.classList.add("open-trama");

    setTimeout(() => {
        trama.classList.add("open-trama-styles");
    },100)
  

} 

const searchProducts = (e) => {


    let search_product = e.target.value.toLowerCase();
        console.log(search_product);
        if (search_product !== '' && search_product.length !== 0) {

            let new_products_data = [];

            listProducts.map( product => {
                
                let product_reference = product.Referencia.toLowerCase();
                let product_characteristics = product.Caracteristicas.toLowerCase();
                let product_category = product.GrupoDeProductos.Description.toLowerCase();
                
                if (product_reference.includes(search_product) || product_characteristics.includes(search_product) || product_category.includes(search_product)) {
                    new_products_data.push(product);
                }
            });

            setProducts(new_products_data);
        }else{
            setProducts(listProducts);
        }
    
} 



useEffect( () => {   

    const getProductsAPI = async() => {

        const URL_BASE = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora?max=10&where=Marca.Marca%3D%221hora%22";
        const products_api = await fetch(URL_BASE);
        const products_data = await products_api.json();
        
        setProducts(await products_data);
        setListProducts(await products_data);
    
    }

    getProductsAPI();
    
}, []);

return (
        <>
            <header className="header">
                <div className="header__container container">
                    <div className="header__logo">
                        <a href="/">
                            <img src="./img/Logo_1Hora 1.png" alt="" />
                        </a>
                    </div>
                    <nav className="header__nav">
                        <input type="text" placeholder="Filtrar por producto" id="search-product" onChange={(e) => searchProducts(e)} />
                        <button className="btn btn-search">
                            <img src="./img/search.png" alt="" />
                        </button>
                    </nav>
                    <div className="header__cart" onClick={openCart}>
                        <div className="btn btn-cart" id="btn-cart">
                            <img src="./img/cart.png" alt="" />
                        </div>
                        <div className="header__text-cart">
                            <span>Tu carrito</span>
                            <span className="header__price-cart">{formatNumber(total, true)} COP</span>
                        </div>
                    </div>
                    
                </div>
            
            </header>
        </>
    )
}
