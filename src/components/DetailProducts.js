import React from 'react'
import { formatNumber } from '../helpers/formatNumbers.js'

export const DetailProducts = ({productsCart, productDetail = null,  setProductsCart, setSubtotal, setTotal, setIva}) => {

    const URL_BASE = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora?where=Marca.Marca%3D%221hora%22";
    

    const closeProductDetail = () => {

        const cont_detail = document.querySelector('#detail-product');
        const trama = document.querySelector('.trama');

        cont_detail.classList.remove('show');
        trama.classList.remove('open-trama-styles');
        setTimeout( () => {
            cont_detail.classList.remove('open');

            trama.classList.remove('open-trama');
            
        }, 400);

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

        const alert = document.querySelector('.alert');
        const progress = document.querySelector('.alert-progress');

        alert.classList.add('active');
        progress.classList.add('active');

        setTimeout( () => {
            alert.classList.remove('active');  
            progress.classList.remove('active');         
        }, 4000)

        setTotal(total);
        setSubtotal(subtotal);
        setIva(iva);
    } 
    
  return (
    <>
        <div className='detail' id='detail-product'>

            <div className="cart__header-img">
                <img src="./img/Logo_1Hora 1 blanco.png" alt=""/>
            </div>

            <div className="cart__close-cart" id="close-cart" onClick={closeProductDetail}>
                <i className="fa-solid fa-xmark"></i>
            </div>

            <div className='container detail__container'>
             
                    <div className='row row-center'>
                        <div className='col col-50 col-mb-100 col-50-sm-mb'>
                            <div className="products__card-img">
                                    <img src={productDetail && productDetail.Imagen_publica.url} alt=""/>
                                </div>
                            </div>
                        <div className='col col-50 col-mb-100'>
                            <div className="products__card-description">
                                <span className="products__type">{productDetail && productDetail.GrupoDeProductos.Description}</span>
                                <h3 className="products__title">{productDetail && productDetail.Referencia}</h3>
                                <p className='products__description' dangerouslySetInnerHTML={productDetail && {__html: productDetail.Caracteristicas.replace(/-/g, `<li/>` )}} ></p>
                                <div className="products__cont-price-cart">
                                    <div className="products__cont-price">
                                        {/* Cambiar para mas adelante el precio del producto */}
                                        <span className="products__price">{productDetail && formatNumber(productDetail.Precio_Mayorista, true) } COP</span>
                                        {/* <span className="products__price-before">$79.900 COP</span> */}
                                    </div>
                                    
                                </div>

                                <div className="products__options detail-product">
                                {/* <button className="btn btn-blue">Comprar</button> */}
                                    <div className="products__options-product detail-product" id={productDetail.ID} onClick={ productsCart !== null && productsCart.find(item => item.ID === productDetail.ID) ? null : () => addProductCart(productDetail.ID)} >
                                    {productsCart !== null && productsCart.find(item => item.ID === productDetail.ID) ? (<>En el carrito <i class="fa-solid fa-check"></i></>) : (<>Agregar al carrito <img src="./img/cart-product.png" alt="" /> </>) }
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
        

    
    </>
  )
}
