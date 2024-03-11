import React, { useEffect, useState } from 'react'
import { formatNumber } from '../helpers/formatNumbers';
import { RegisterSend } from './RegisterSend';

export const Cart = ({productsCart, setProductsCart, subtotal, setSubtotal, total, setTotal}) => {
    // const [listCart, setListCart] = useState([]);

    

    const [clients, setClients] = useState([]);
    const [alertSuccess, setAlertSuccess] = useState('');
    

    const closeCart = () => {
        const cart = document.querySelector("#cart");
        const trama = document.querySelector(".trama");

        cart.classList.remove("open-cart");
        trama.classList.remove("open-trama-styles");
        

        setTimeout(() => {
            trama.classList.remove("open-trama");
        },400)
    }

    const getListCart = () => {
        let products_cart = JSON.parse(localStorage.getItem("product"));

        setProductsCart(products_cart);

        
    } 

    const deleteProductCart = (id) => {

        let new_products_cart = productsCart.filter( (product) => product.ID !== id );
        let total = 0;
        let subtotal = 0;
        
        setProductsCart(new_products_cart);
        localStorage.setItem('product', JSON.stringify(new_products_cart));

        new_products_cart.map(product => {
            total += product.precio;
            subtotal += product.precio;
        });

        setTotal(total);
        setSubtotal(subtotal);
           
    }

    const increaseQuantity = (e,id) => {

        /* let search_index_product = productsCart.findIndex( (product) => product.ID === id );
        let list_products = productsCart;
        list_products[search_index_product].quantity += 1;
        setProductsCart(list_products);
        console.log(list_products); */
        let subtotal = 0;
        let total = 0;

    
       let new_products_cart = productsCart.filter( (product) =>{
            if (product.ID === id) {
                product.quantity++;
                if (product.quantity > 0) {

                    product.precio = parseInt(product.Precio_Mayorista) * product.quantity;
                }
            }

            subtotal += product.precio;
            total += product.precio;
        return product.ID !== null;
       });


       setSubtotal(subtotal);
       setTotal(total);
        setProductsCart(new_products_cart);
        localStorage.setItem('product', JSON.stringify(new_products_cart));
       

    }

    const reduceQuantity = (e,id) => {

        let subtotal = 0;
        let total = 0;

        let new_products_cart = productsCart.filter( (product) =>{
            if (product.ID === id && product.quantity > 1) {
                product.quantity--;
                product.precio = parseInt(product.Precio_Mayorista) * product.quantity;
                
            }
        
            subtotal += product.precio;
            total += product.precio;

        return product.ID !== null;
       });
        
        setSubtotal(subtotal);
        setTotal(total);
        setProductsCart(new_products_cart);
        localStorage.setItem('product', JSON.stringify(new_products_cart));
    }

    const modifyQuantity = (e, id) => {
        let subtotal = 0;
        let total = 0;
        let input_value = e.target.value;

        let new_products_cart = productsCart.filter( (product) => {

            if (product.ID === id) {
                product.quantity = input_value;
                
                if (product.quantity > 0) {
                    
                    product.precio = parseInt(product.Precio_Mayorista) * product.quantity;
                    
                }else if(product.quantity.length === 0){
                    
                    product.precio = parseInt(product.Precio_Mayorista);
                }
            }

            subtotal += product.precio;
            total += product.precio;
            
            return product.ID !== null;

        });

        setSubtotal(subtotal);
       setTotal(total);
        setProductsCart(new_products_cart);
        localStorage.setItem('product', JSON.stringify(new_products_cart));

    }

    
    /* const getClientsAPI = async(id) => {
        const clients_api = await fetch(URL_CLIENTS + `?where=Documento.contains(%22${id}%22)`);

        const clients_data = await clients_api.json();
        
        setClients(await clients_data);    

        console.log(URL_CLIENTS);
    } */



    const closeAlert = () => {

        const alert = document.querySelector('.alert');
        const progress = document.querySelector('.alert-progress');

        alert.classList.remove('active');
        progress.classList.remove('active'); 
    }


     

   

    useEffect( () => {
        getListCart();

        let total = 0;
        let subtotal = 0;
        let products_cart = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];

        products_cart.map( product => {
            subtotal += product.precio; 
            total += product.precio; 
        });
        
        setSubtotal(subtotal);
        setTotal(total);
        //getClientsAPI();
    }, []);


    return (
    <>
        <div className="cart" id="cart">

            <div className="cart__header-img">
                <img src="./img/Logo_1Hora 1 blanco.png" alt=""/>
            </div>

            <div className="cart__close-cart" id="close-cart" onClick={closeCart}>
                <i className="fa-solid fa-xmark"></i>
            </div>

            <div className="container cart__container">
                <div className="row">
                    <div className="col col-100">
                        <h3 className="title">Carrito de Compras</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col col-66">
                        <table className="table cart__table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Total</th>
                                    <th className="cart__delete-all-text">Eliminar todo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsCart && productsCart.length !== 0 ? (
                                    productsCart.map(product => {
                                    
                                        return (

                                            <tr key={product.id} id={product.ID}>
                                                <td className="cart__data" >
                                                    <div className="cart__img">
                                                        <img src={product.Imagen_publica.url} alt=""/>
                                                    </div>
                                                    <div className="cart__information">
                                                        <span className="cart__name-product">{product.Referencia}</span>
                                                        <span className="cart__category">{product.GrupoDeProductos.Description}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="cart__quantity">

                                                        <div className="cart__operation cart__minus" id="minus" onClick={(e) => reduceQuantity(e,product.ID)}>
                                                            <i className="fa-solid fa-minus"></i>
                                                        </div>

                                                        <input type="text" className="cart__input-quantity" id="quantity" onChange={(e) => modifyQuantity(e,product.ID)} value={product.quantity} />

                                                        <div className="cart__operation cart__plus" id="plus" onClick={(e) => increaseQuantity(e,product.ID)}>
                                                            <i className="fa-solid fa-plus"></i>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">{formatNumber(product.precio, true)}</td>
                                                <td className="text-center "> 
                                                    <div className="cart__delete" id={product.ID} onClick={ () => deleteProductCart(product.ID) }>
                                                        <i className="fa-solid fa-xmark"></i> 
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })
                                ) : ( 
                                    <tr>
                                        <td colspan="4" className='text-center'>El carrito esta vacío</td>
                                    </tr> 
                                )}
                                
                            
                            </tbody>

                        </table>
                    </div>
                    
                    <div className="col col-33 position-relative">
                        <RegisterSend total={total} subtotal={subtotal} productsCart={productsCart} setAlertSuccess={setAlertSuccess}/>
                    </div>
                </div>

            </div>
        </div>
        <div className='alert'>
            <div className='alert-content'>
                {alertSuccess === true ? (<i class="fa-solid fa-circle-check blue"></i>) : ''}
                {alertSuccess === false ? (<i class="fa-solid fa-triangle-exclamation orange"></i>) : ''}
                <div className='alert-description'>
                    {alertSuccess === true ? ( 
                        <>
                            <span className='text-bold'>Enviado</span>
                            <span>El usuario ya existe en nuestra base de datos</span>
                        </>
                     ) : ''}

                     {alertSuccess === false ? (
                        
                        <>
                            <span className='text-bold'>Error</span>
                            <span>El usuario no existe en nuestra base de datos</span>
                        </>
                     ): ''}
                    {/* <span className='text-bold'>Enviado</span>
                    <span>Usuario verificado en la base de datos</span> */}
                </div>
                <div className='alert-close' onClick={closeAlert}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className='alert-progress'></div>
        </div>

       
        
        <div className="trama"></div>
    </>
    )
}