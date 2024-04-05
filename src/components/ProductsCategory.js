import React, { useEffect, useState } from 'react'
import { formatNumber } from '../helpers/formatNumbers';
import { Products } from './Products';

export const ProductsCategory = ({category = '', setProductsCart, setSubtotal, setTotal, products, setProducts, setIva}) => {
    
    let URL_BASE = category !== '' ? "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora?max=10&where=Marca.Marca%3D%221hora%22%26%26Tipo.Nombre%3D%22" + category + "%22" : "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora?max=10&where=Marca.Marca%3D%221hora%22";


    const total_products = products.length;
    const [productsForPage, setProductsForPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumbers = [];


    for (let i = 1; i < Math.ceil(total_products / productsForPage); i++) {
       pageNumbers.push(i);
        
    }

    const addProductCart = async(id) => {

        let URL_API = URL_BASE + '%26%26ID%3D' + id;
        let product_api = await fetch(URL_API);
        let product_data = await product_api.json();

        let total = 0;
        let subtotal = 0;
        let iva = 0;
        

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

                let iva_decimal = parseInt(product.GrupoDeProductos.IVA1) / 100;
                console.log(iva_decimal);
                subtotal += product.precio - (iva_decimal * product.precio);
                total += product.precio;
                iva += iva_decimal * product.precio;
            });


        }else{
            localStorage.setItem('product', JSON.stringify([product_data[0]]));
            setProductsCart([product_data[0]]);

            let iva_decimal = parseInt(product_data[0].GrupoDeProductos.IVA1) / 100;

            subtotal += product_data[0].precio - (iva_decimal * product_data[0].precio);
            total += product_data[0].precio;
            iva += iva_decimal * product_data[0].precio;

        }

        setTotal(total);
        setSubtotal(subtotal);
        setIva(iva);
    } 


    // Paginación
   // const page 

  return (
    <>
        {products && products.length !== 0 && (
            products.map( product => {
                return(
                    <div className="col col-33 col-mb-50" key={product.id} id={product.ID}>
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
                                        {/* <span className="products__price-before">$79.900 COP</span> */}
                                    </div>
                                    
                                </div>

                                
                            </div>

                            {/* <div className="products__discounts">
                                <span>-37% OFF</span>
                            </div> */}

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

        <div className='col col-100'>
            <nav aria-label="pagination-products">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                        {pageNumbers.map(noPage => {
                            return(
                                <li class="page-item" key={noPage}>
                                    <a class="page-link active" href="#">{noPage}</a>
                                </li>
                            )
                        })}
                       
                        
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
        </div>
    </>
  )
}
