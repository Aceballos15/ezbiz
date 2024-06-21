import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export const Products = ({groupProducts, setCurrentPage}) => {

    const linkActive = (isActive) => {
        if (isActive) {
            return "btn btn-category active";
        }

        return "btn btn-category";
    }

    const resetCurrentPage = () => {
        setCurrentPage(1);

    }
    
  return (
    <>
      <section className="banner">
            <div className="container">
                <div className="row">
                    <div className="col col-100">
                        <div className="owl-carousel owl-theme">
                            <div className="item">
                                <div className="banner__img">
                                    <img src="./img/Banner-Ezviz-Header-Img1.png" alt=""/>
                                </div>
                                
                            </div>
                            <div className="item">
                                <div className="banner__img">
                                    <img src="./img/Banner-Ezviz-Header-Img2.jpg" alt=""/>
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
                        <div className="col col-25 col-mb-100">
                            <div className="products__category">
                                <h3 className="title">Categoría</h3>
                                <div className="products__cont-categories">
                                <NavLink to='/' className={ ({isActive}) => linkActive(isActive)}> Todas </NavLink>
                            
                            { groupProducts && groupProducts.length !== 0 && ( 
                                groupProducts.map( group => {
                                    return (
                                        <>
                                            <NavLink to={group} className={ ({isActive}) => linkActive(isActive)} onClick={resetCurrentPage}> {group} </NavLink>
                    
                                        </> 
                                    )          
                                })
                            )}
                            </div>
                            </div>
                        </div>
                        <div className="col col-75 col-mb-100">
                            <div className="row position-relative">
                                
                                <Outlet />
                                
                            </div>
                            
                        </div>           
                    </div>
                
            </div>
        </section>
        
    </>
  ) 
}
