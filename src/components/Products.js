import React, { useEffect, useState } from 'react'

export const Products = ({productsCart, setProductsCart}) => {
    const URL_BASE = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora?max=10&where=Marca.Marca%3D%221hora%22";

    const [products, setProducts] = useState([]);

    const saveLocalStorage = async(id) => {

        let URL_API = URL_BASE + '%26%26ID%3D' + id;
        let product_api = await fetch(URL_API);
        let product_data = await product_api.json();
        
        console.log(product_data);

        let listCart = JSON.parse(localStorage.getItem('product'));

        if (Array.isArray(listCart)) {

            listCart.push(product_data[0]);

            localStorage.setItem('product', JSON.stringify(listCart));
            setProductsCart(listCart);

        }else{
            localStorage.setItem('product', JSON.stringify([product_data[0]]));
            setProductsCart([product_data[0]]);
        }

        
    }


    //Cargar los productos de 1 hora desde la API
    useEffect( () => {
        
        const getProductsAPI = async() => {
            const products_api = await fetch(URL_BASE);
    
            const products_data = await products_api.json();

            setProducts( await products_data);
        }

        getProductsAPI();

    },[])

    console.log(products);
  return (
    <>
      <section className="banner">
            <div className="container">
                <div className="row">
                    <div className="col col-100">
                        <div className="owl-carousel owl-theme">
                            <div className="item">
                                <div className="banner__img">
                                    <img src="./img/Frame1.png" alt=""/>
                                </div>
                                
                            </div>
                            <div className="item">
                                <div className="banner__img">
                                    <img src="./img/Frame2.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Productos */}
        <section className="products section">
            <div className="container">
                <div className="row">
                    <div className="col col-25">
                        <div className="products__category">
                            <h3 className="title">Categoría</h3>
                            <div className="products__cont-categories">
                                <a href="/" className="btn btn-category active">Todas</a>
                                <a href="/" className="btn btn-category ">Audífonos</a>
                                <a href="/" className="btn btn-category ">Bocinas</a>
                                <a href="/" className="btn btn-category ">Cargadores</a>

                            </div>
                        </div>
                    </div>
                    <div className="col col-75">
                        <div className="row">
                            { products !== null && (
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
                                                            <span className="products__price">${product.Precio_Mayorista} COP</span>
                                                            <span className="products__price-before">$79.900 COP</span>
                                                        </div>
                                                        
                                                    </div>

                                                    
                                                </div>
                    
                                                <div className="products__discounts">
                                                    <span>-37% OFF</span>
                                                </div>

                                                <div className="products__options">
                                                    <button className="btn btn-blue">Comprar</button>

                                                    <div className="products__add-product" id={product.ID} onClick={() => saveLocalStorage(product.ID)}>
                                                        <img src="./img/cart-product.png" alt="" />
                                                    </div>
                                                </div>

                                            </article>
                                        </div>
                                    )
                                })
                            )}
                            
                            
                            
                        </div>
                        
                    </div>           
                </div>
            </div>
        </section>
    </>
  ) 
}
