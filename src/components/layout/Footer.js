import React from 'react'

export const Footer = () => {
  return (
    <>
        <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col col-100">
                    <div className="footer__content-img">
                        <img src="./img/Banner-Ezviz-Footer.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer__logos">
            <div className="footer__img-logo">
                <img src="./img/Logo-asinfy.svg" alt="" />
            </div>

            <div className="footer__img-logo">
                <img src="./img/Ezviz-logo-white.svg" alt=""/>
            </div>
        </div>
        <div className="footer__text">
            <span>Copyright &copy; {new Date().getFullYear()} Tecnosuper - Ezviz. Desarrollado por <b>Asinfy</b>.</span>
        </div>
    </footer>
    <div className='load load-display'> 
        <div className='logo-display'>
            <img src='./img/Ezviz-Logo.svg'></img>
        </div>
        <div className='loader'></div>
    </div>
   
    
    </>
  )
}
