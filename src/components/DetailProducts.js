import React from 'react'
import { formatNumber } from '../helpers/formatNumbers'

export const DetailProducts = ({productDetail = null}) => {

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
             
                    <div className='row'>
                        <div className='col col-50'>
                            <div className="products__card-img">
                                    <img src={productDetail && productDetail.Imagen_publica.url} alt=""/>
                                </div>
                            </div>
                        <div className='col col-50'>
                            <div className="products__card-description">
                                <span className="products__type">{productDetail && productDetail.GrupoDeProductos.Description}</span>
                                <h3 className="products__title">{productDetail && productDetail.Referencia}</h3>
                                <p className='products__description'>{productDetail && productDetail.Caracteristicas}</p>
                                <div className="products__cont-price-cart">
                                    <div className="products__cont-price">
                                        {/* Cambiar para mas adelante el precio del producto */}
                                        <span className="products__price">{productDetail && formatNumber(productDetail.Precio_Mayorista, true) } COP</span>
                                        {/* <span className="products__price-before">$79.900 COP</span> */}
                                    </div>
                                    
                                </div>

                                <div className="products__options detail-product">
                                {/* <button className="btn btn-blue">Comprar</button> */}
                                    <div className="products__options-product detail-product" >
                                        Agregar al carrito
                                        <img src="./img/cart-product.png" alt="" />
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
