export const formatNumber = (numero, isMoney) => {
    const numFormato = isMoney ? `$${parseInt(numero)}` : numero.toString();
    return numFormato.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};