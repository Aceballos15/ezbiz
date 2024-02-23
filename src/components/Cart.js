import React, { useEffect } from 'react'

export const Cart = ({productsCart, setProductsCart}) => {
    // const [listCart, setListCart] = useState([]);
        
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

    console.log(productsCart);
    } 

    const deleteProductCart = (id) => {

        let producs_cart = JSON.parse(localStorage.getItem("product"));

        let new_products_cart = productsCart.filter( (product) => product.ID !== id );

        setProductsCart(new_products_cart);
        

        console.log();
    
    }

    useEffect( () => {
        getListCart();
    }, [])


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
                                {productsCart !== null && (
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

                                                        <div className="cart__operation cart__minus" id="minus">
                                                            <i className="fa-solid fa-minus"></i>
                                                        </div>

                                                        <input type="text" className="cart__input-quantity" id="quantity" />

                                                        <div className="cart__operation cart__plus" id="plus">
                                                            <i className="fa-solid fa-plus"></i>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">{product.Precio_Mayorista}</td>
                                                <td className="text-center "> 
                                                    <div className="cart__delete" id={product.ID}>
                                                        <i className="fa-solid fa-xmark"></i> 
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })
                                )}
                                
                            
                            </tbody>

                        </table>
                    </div>
                    <div className="col col-33">
                        <div className="cart__card">
                            <div className="cart__header-card">
                                Resumen de Compra
                            </div>
                            <div className="cart__body-card">
                                <div className="cart__cont-total">
                                    <p>Subtotal: <span className="text-bold"> $1.200.000 </span></p> 
                                    <p>Costo de envío: <span className="text-bold"> $20.000 </span></p>
                                    <p className="cart__total">Total:  <span>$1.220.000 COP </span></p>
                                </div>

                                <div className="cart__methods">
                                    <p className="text-center">Puedes usar cualquiera de los siguientes medios de pago</p>
                                    <div className="cart__payment-types">
                                        <span> <img src="./img/payment-pages/bancolombia.png" alt=""/> Bancolombia </span>
                                        <span> <img src="./img/payment-pages/tarjetacredito.png" alt=""/> Tarjeta de Crédito/Débito </span>
                                        <span> <img src="./img/payment-pages/pse.png" alt=""/> PSE </span>

                                    </div>
                                </div>

                                <div className="cart__data-user">
                                    <p>Ingresa los siguientes datos para continuar</p>
                                    <form action="" className="form__data-cart">
                                        <select className="form-control">
                                            <option value="">Tipo</option>
                                            <option value="">C.C</option>
                                            <option value="">T.I</option>
                                        </select>

                                        <input type="text" className="form-control" placeholder="Número de documento"/>
                                        
                                    </form>
                                    
                                </div>
                                <div className="cart__cont-next">
                                    <a href="/" className="btn btn-blue"> Continuar </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div className="trama"></div>
    </>
    )
}
