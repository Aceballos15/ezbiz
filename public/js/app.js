
const acciones = {

    ready: () => {  

        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1000: {
                    items: 1
                }

            }
        });

    }

}

$(document).ready(acciones.ready);


/* const ready = {

    actions: () => {

        document.querySelector("#btn-cart").addEventListener('click', ready.openCart);
        document.querySelector("#close-cart").addEventListener('click', ready.closeCart);
    },

    openCart: () => {
        
        const cart = document.querySelector("#cart");
        const trama = document.querySelector(".trama");

        cart.classList.add("open-cart");
        trama.classList.add("open-trama");

        setTimeout(() => {
            trama.classList.add("open-trama-styles");
        },100)
    },

    closeCart: () => {
        const cart = document.querySelector("#cart");
        const trama = document.querySelector(".trama");

        cart.classList.remove("open-cart");
        trama.classList.remove("open-trama-styles");
        

        setTimeout(() => {
            trama.classList.remove("open-trama");
        },400)
    }

}

document.addEventListener('DOMContentLoaded', ready.actions); */

