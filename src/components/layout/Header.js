import React from 'react'

export const Header = () => {
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
                        <input type="text" placeholder="Filtrar por producto" id="search-product" />
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
                            <span className="header__price-cart">$0.00 COP</span>
                        </div>
                    </div>
                    
                </div>
            
            </header>
        </>
    )
}
