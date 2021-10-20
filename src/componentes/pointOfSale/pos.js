import React, {useState, useEffect, useContext} from 'react';
import {ProductCard, ProductSelectedCard} from './productCard';
import {POSProvider, useDBProducts, usePrice, useConsumerMoney, useSelectedProducts} from './productsContext';
import axios from 'axios';

export const POS = () => {
    return(
        <POSProvider>
            <POSComponent/>
        </POSProvider>
    );
}

const POSComponent = () => {
    const [showGenericModal, setGenericModal] = useState(false);
    const [showResumenCompra, setShowResumenCompra] = useState(false);

    const [productos, SetProductos] = useSelectedProducts();
    const [precioTotal, setPrecioTotal] = usePrice();
    const [dineroEntregado, setDineroEntregado] = useConsumerMoney();

    return(
        <div>
            <div className="hide-print flex flex-row h-screen antialiased text-gray-800">
            {/* Página principal del POS */}
            <div className="flex-grow flex">
                {/* Menú tienda, donde se muestran los productos */}
                <ProductDisplay/>
                {/* Menú tienda */}
                {/* Sidebar derecho */}
                <div className="w-5/12 flex flex-col bg-gray-100 h-full pr-4 pl-2 py-4">
                    <div className="bg-white rounded-3xl flex flex-col h-full shadow">
                        {/* En caso de carrito vacío o con productos */}
                        {productos.length <= 0 ? <CarritoVacio/> : <CarritoConProductos/>}
                        
                        {/* Información del pago */}
                        <div className="select-none h-auto w-full text-center pt-3 pb-4 px-4">
                        <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
                            <div>TOTAL</div>
                            <div className="text-right w-full">
                                {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                {productos.length <= 0 ? 0 : precioTotal} €
                            </div>
                        </div>
                        <div className="mb-3 text-gray-700 px-3 pt-2 pb-3 rounded-lg bg-gray-200">
                            <div className="flex text-lg font-semibold">
                            <div className="flex-grow text-left">EFECTIVO</div>
                            <div className="flex text-right">
                                <div className="mr-2">€</div>
                                <input type="text" inputMode="numeric" className="w-28 text-right bg-white shadow rounded-lg 
                                    focus:bg-white focus:shadow-lg px-2 focus:outline-none" onChange={(e) => !isNaN(e.target.value) ? setDineroEntregado(e.target.value) : 0} value={dineroEntregado}/>
                            </div>
                            </div>
                            <hr className="my-2" />
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {/* Botones de dinero rápido */}
                                <button className="bg-white shadow rounded-lg hover:shadow-lg hover:bg-green-200 focus:outline-none" onClick={() => {setDineroEntregado(0)}}>0€</button>
                                <button className="bg-white shadow rounded-lg hover:shadow-lg hover:bg-green-200 focus:outline-none" onClick={() => {setDineroEntregado(+(dineroEntregado) + 1)}}>+1€</button>
                                <button className="bg-white shadow rounded-lg hover:shadow-lg hover:bg-green-200 focus:outline-none" onClick={() => {setDineroEntregado(+(dineroEntregado) + 5)}}>+5€</button>
                                <button className="bg-white shadow rounded-lg hover:shadow-lg hover:bg-green-200 focus:outline-none" onClick={() => {setDineroEntregado(+(dineroEntregado) + 10)}}>+10€</button>
                                <button className="bg-white shadow rounded-lg hover:shadow-lg hover:bg-green-200 focus:outline-none" onClick={() => {setDineroEntregado(+(dineroEntregado) + 20)}}>+20€</button>
                                <button className="bg-white shadow rounded-lg hover:shadow-lg hover:bg-green-200 focus:outline-none" onClick={() => {setDineroEntregado(+(dineroEntregado) + 50)}}>+50€</button>

                            </div>
                        </div>
                        {/* El cambio debe aparecer cuando el dinero entregado sea mayor q cero */}
                        {
                            dineroEntregado > 0 ?
                            <div className="flex mb-3 text-lg font-semibold bg-green-100 rounded-lg py-2 px-3">
                                <div className="text-green-600">CAMBIO</div>
                                <div className="text-right flex-grow text-green-600" text="buenasss">
                                    {parseFloat(dineroEntregado - precioTotal).toFixed(2)} €
                                </div>
                            </div>
                            :
                            null
                        }
                        
                        {/* Mostrar en caso de que el cambio sea negativo */}
                        {
                            dineroEntregado - precioTotal < 0 ? 
                            <div className="flex mb-3 text-lg font-semibold bg-pink-100 text-blue-gray-700 rounded-lg py-2 px-3">
                                <div className="text-right flex-grow text-pink-600">
                                    <span className="inline-block ml-1">{dineroEntregado - precioTotal}</span>
                                </div>
                            </div>
                            : null
                        }

                        {/* Mostrar en caso de que el cambio sea exactamente 0 y hayan productos en el carrito */}
                        {
                            dineroEntregado - precioTotal == 0 && productos.length > 0 ? 
                            <div>
                                <div x-show="change == 0 && cart.length > 0" className="flex justify-center mb-3 text-lg font-semibold bg-blue-50 text-blue-700 rounded-lg py-2 px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                </div>
                                <button className="text-white rounded-2xl text-lg w-full py-3 focus:outline-none">
                                    <span className="inline-block ml-1"> </span>
                                </button>
                            </div>
                            : 
                            null
                        }
                        
                        </div>
                        {/* end of payment info */}
                    </div>
                </div>
                {/* Fin sidebar derecho */}
            </div>
            {/* Modal generico */}
            {showGenericModal? <ModalGenerico/>: null}
            {/* Modal ticket */}
            {showResumenCompra? <ModalTicket/>: null}
            </div>
            {/* end of noprint-area */}
            <div id="print-area" className="print-area" />
        </div>
    );
}

const ModalTicket = (props) => {
    return(
        <div x-show="isShowModalReceipt" className="fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24">
            <div x-show="isShowModalReceipt" className="fixed glass w-full h-screen left-0 top-0 z-0" />
            <div x-show="isShowModalReceipt" className="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10">
            <div id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
                <div className="text-center">
                <img src="img/receipt-logo.png" alt="Tailwind POS" className="mb-3 w-8 h-8 inline-block" />
                <h2 className="text-xl font-semibold">ERPWeb Punto de venta</h2>
                <p> Nombre empresa </p>
                </div>
                <div className="flex mt-4 text-xs">
                <div className="flex-grow">No: <span x-text="receiptNo" /></div>
                <div x-text="receiptDate" />
                </div>
                <hr className="my-2" />
                <div>
                <table className="w-full text-xs">
                    <thead>
                    <tr>
                        <th className="py-1 w-1/12 text-center">#</th>
                        <th className="py-1 text-left">Item</th>
                        <th className="py-1 w-2/12 text-center">Qty</th>
                        <th className="py-1 w-3/12 text-right">Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* <template x-for="(item, index) in cart" :key="item" /> */}
                    </tbody>
                </table>
                </div>
                <hr className="my-2" />
                <div>
                <div className="flex font-semibold">
                    <div className="flex-grow">TOTAL</div>
                    <div x-text="priceFormat(getTotalPrice())" />
                </div>
                <div className="flex text-xs font-semibold">
                    <div className="flex-grow">CANTIDAD A PAGAR</div>
                    <div x-text="priceFormat(cash)" />
                </div>
                <hr className="my-2" />
                <div className="flex text-xs font-semibold">
                    <div className="flex-grow">CAMBIO</div>
                    <div x-text="priceFormat(change)" />
                </div>
                </div>
            </div>
            <div className="p-4 w-full">
                <button className="bg-blue-500 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none">PROCEED</button>
            </div>
            </div>
        </div>
    );
}

const ModalGenerico = (props) => {
    return (
        <div x-show="firstTime" className="fixed glass w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24">
            <div className="w-96 rounded-3xl p-8 bg-white shadow-xl">
            <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block" width="123.3" height="123.233" viewBox="0 0 32.623 32.605">
                <path d="M15.612 0c-.36.003-.705.01-1.03.021C8.657.223 5.742 1.123 3.4 3.472.714 6.166-.145 9.758.019 17.607c.137 6.52.965 9.271 3.542 11.768 1.31 1.269 2.658 2 4.73 2.57.846.232 2.73.547 3.56.596.36.021 2.336.048 4.392.06 3.162.018 4.031-.016 5.63-.221 3.915-.504 6.43-1.778 8.234-4.173 1.806-2.396 2.514-5.731 2.516-11.846.001-4.407-.42-7.59-1.278-9.643-1.463-3.501-4.183-5.53-8.394-6.258-1.634-.283-4.823-.475-7.339-.46z" fill="#fff" /><path d="M16.202 13.758c-.056 0-.11 0-.16.003-.926.031-1.38.172-1.747.538-.42.421-.553.982-.528 2.208.022 1.018.151 1.447.553 1.837.205.198.415.313.739.402.132.036.426.085.556.093.056.003.365.007.686.009.494.003.63-.002.879-.035.611-.078 1.004-.277 1.286-.651.282-.374.392-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.147-.072zM16.22 19.926c-.056 0-.11 0-.16.003-.925.031-1.38.172-1.746.539-.42.42-.554.981-.528 2.207.02 1.018.15 1.448.553 1.838.204.198.415.312.738.4.132.037.426.086.556.094.056.003.365.007.686.009.494.003.63-.002.88-.034.61-.08 1.003-.278 1.285-.652.282-.374.393-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.863-1.31-.977a7.91 7.91 0 00-1.146-.072zM22.468 13.736c-.056 0-.11.001-.161.003-.925.032-1.38.172-1.746.54-.42.42-.554.98-.528 2.207.021 1.018.15 1.447.553 1.837.205.198.415.313.739.401.132.037.426.086.556.094.056.003.364.007.685.009.494.003.63-.002.88-.035.611-.078 1.004-.277 1.285-.651.282-.375.393-.895.393-1.85 0-.688-.065-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.146-.072z" fill="#00dace" /><path d="M9.937 13.736c-.056 0-.11.001-.161.003-.925.032-1.38.172-1.746.54-.42.42-.554.98-.528 2.207.021 1.018.15 1.447.553 1.837.204.198.415.313.738.401.133.037.427.086.556.094.056.003.365.007.686.009.494.003.63-.002.88-.035.61-.078 1.003-.277 1.285-.651.282-.375.393-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.146-.072zM16.202 7.59c-.056 0-.11 0-.16.002-.926.032-1.38.172-1.747.54-.42.42-.553.98-.528 2.206.022 1.019.151 1.448.553 1.838.205.198.415.312.739.401.132.037.426.086.556.093.056.003.365.007.686.01.494.002.63-.003.879-.035.611-.079 1.004-.278 1.286-.652.282-.374.392-.895.393-1.85 0-.688-.066-1.185-.2-1.505-.228-.547-.653-.864-1.31-.978a7.91 7.91 0 00-1.147-.071z" fill="#00bcd4" /><g><path d="M15.612 0c-.36.003-.705.01-1.03.021C8.657.223 5.742 1.123 3.4 3.472.714 6.166-.145 9.758.019 17.607c.137 6.52.965 9.271 3.542 11.768 1.31 1.269 2.658 2 4.73 2.57.846.232 2.73.547 3.56.596.36.021 2.336.048 4.392.06 3.162.018 4.031-.016 5.63-.221 3.915-.504 6.43-1.778 8.234-4.173 1.806-2.396 2.514-5.731 2.516-11.846.001-4.407-.42-7.59-1.278-9.643-1.463-3.501-4.183-5.53-8.394-6.258-1.634-.283-4.823-.475-7.339-.46z" fill="#fff" /><path d="M16.202 13.758c-.056 0-.11 0-.16.003-.926.031-1.38.172-1.747.538-.42.421-.553.982-.528 2.208.022 1.018.151 1.447.553 1.837.205.198.415.313.739.402.132.036.426.085.556.093.056.003.365.007.686.009.494.003.63-.002.879-.035.611-.078 1.004-.277 1.286-.651.282-.374.392-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.147-.072zM16.22 19.926c-.056 0-.11 0-.16.003-.925.031-1.38.172-1.746.539-.42.42-.554.981-.528 2.207.02 1.018.15 1.448.553 1.838.204.198.415.312.738.4.132.037.426.086.556.094.056.003.365.007.686.009.494.003.63-.002.88-.034.61-.08 1.003-.278 1.285-.652.282-.374.393-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.863-1.31-.977a7.91 7.91 0 00-1.146-.072zM22.468 13.736c-.056 0-.11.001-.161.003-.925.032-1.38.172-1.746.54-.42.42-.554.98-.528 2.207.021 1.018.15 1.447.553 1.837.205.198.415.313.739.401.132.037.426.086.556.094.056.003.364.007.685.009.494.003.63-.002.88-.035.611-.078 1.004-.277 1.285-.651.282-.375.393-.895.393-1.85 0-.688-.065-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.146-.072z" fill="#00dace" /><path d="M9.937 13.736c-.056 0-.11.001-.161.003-.925.032-1.38.172-1.746.54-.42.42-.554.98-.528 2.207.021 1.018.15 1.447.553 1.837.204.198.415.313.738.401.133.037.427.086.556.094.056.003.365.007.686.009.494.003.63-.002.88-.035.61-.078 1.003-.277 1.285-.651.282-.375.393-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.146-.072zM16.202 7.59c-.056 0-.11 0-.16.002-.926.032-1.38.172-1.747.54-.42.42-.553.98-.528 2.206.022 1.019.151 1.448.553 1.838.205.198.415.312.739.401.132.037.426.086.556.093.056.003.365.007.686.01.494.002.63-.003.879-.035.611-.079 1.004-.278 1.286-.652.282-.374.392-.895.393-1.85 0-.688-.066-1.185-.2-1.505-.228-.547-.653-.864-1.31-.978a7.91 7.91 0 00-1.147-.071z" fill="#00bcd4" /></g>
                </svg>
                <h3 className="text-center text-2xl mb-8">FIRST TIME?</h3>
            </div>
            <div className="text-left">
                <button className="text-left w-full mb-3 rounded-xl bg-blue-gray-500 text-white focus:outline-none hover:bg-blue-400 px-4 py-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block -mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                </svg>
                LOAD SAMPLE DATA
                </button>
                <button className="text-left w-full rounded-xl bg-blue-gray-500 text-white focus:outline-none hover:bg-teal-400 px-4 py-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block -mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                LEAVE IT EMPTY
                </button>
            </div>
            </div>
        </div>
    )
}

const ProductDisplay = (props) => {
    const [productosFiltrados, SetProductosFiltrados] = useState([]);
    const [allProductos, SetAllProductos] = useDBProducts();

    useEffect(() => {
        const fetchProductos = () => {
            axios.get('http://localhost:8080/api/productos').then(
                (res) => {
                    SetAllProductos([...res.data.message]);
                    SetProductosFiltrados([...res.data.message]);
                }
            );
            
        };
        fetchProductos();
    }, [])

    var filtrarProd = (cadena) => {
        var prodFiltrados = allProductos.filter(prod => prod.nombre.toLowerCase().includes(cadena.toLowerCase()));

        if(prodFiltrados.length <= 0) prodFiltrados = allProductos.filter(prod => prod.ean.some(r => r == cadena));

        SetProductosFiltrados(prodFiltrados);
    }

    return (
        <div className="flex flex-col bg-gray-100 h-full w-full py-4">
            <div className="flex px-2 flex-row relative">
                <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-blue-300 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
                <input onChange={(e) => {filtrarProd(e.target.value);}} className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Buscar producto o código de barras..."/>
            </div>
            <div className="h-full overflow-hidden mt-4">
                <div className="h-full overflow-y-auto px-2">
                    {/* Base de datos vacía */}
                    {allProductos.length <= 0 || !allProductos  ? <BBDDVacia/> : null}
                    
                    {/* Producto no encontrado en la lista de productos */}
                    {productosFiltrados.length <= 0 && allProductos.length > 0 ? <ProductoNoEncontrado/> : <GenerarProductsCards productos={productosFiltrados}/>}
                </div>
            </div>
        </div>
    )
}

const BBDDVacia = () => {
    return(
        <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25" x-show="products.length === 0">
            <div className="w-full text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            <p className="text-xl">
                NO TIENES
                <br />
                PRODUCTOS
            </p>
            </div>
        </div>
    );
}

const ProductoNoEncontrado = () => {
    return (
        <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
            <div className="w-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-xl">
                    PRODUCTO NO ENCONTRADO
                </p>
            </div>
        </div>
    )
}

const GenerarProductsCards = (props) => {
    const [productos, SetProductos] = useSelectedProducts();

    const removeProductoCarrito = (productoID) => {
        SetProductos(productos.filter(prodId => prodId !== productoID));
    }

    return(
        <div className="grid grid-cols-4 gap-4 pb-3">
            {props.productos.map((prod) => {
                return (
                    <button key={prod._id} id={prod._id} onClick={(e)=> {SetProductos({_id: e.currentTarget.id, cantidad: 1, valorEscrito: false});} }>
                        <ProductCard nombreProducto={prod.nombre} precioProducto={prod.precioVenta} imagenProducto={prod.img}/>
                    </button>
                );
            })}
        </div>
    );
}

const CarritoVacio = () => {
    return(
        <div x-show="cart.length === 0" className="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p>
                CARRITO VACÍO
            </p>
        </div>
    );
}

const CarritoConProductos = (props) => {
    const [productos, SetProductos] = useSelectedProducts();
    const [allProducts, SetAllProducts] = useDBProducts();
    const [precioTotal, SetPrecioTotal] = usePrice();

    return (
        <div x-show="cart.length > 0" className="flex-1 flex flex-col overflow-auto">
            <div className="h-16 text-center flex justify-center">
                <div className="pl-8 text-left text-lg py-4 relative">
                {/* Icono carrito */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="text-center absolute text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3"/>
                {` ${productos.length}`}
                </div>
                <div className="flex-grow px-8 text-right text-lg py-4 relative">
                {/* Boton basura */}
                <button className="text-blue-gray-300 hover:text-pink-500 focus:outline-none" onClick={() => {SetProductos({})}}> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                </div>
            </div>
            <div className="flex-1 w-full px-4 overflow-auto">
                {/* Añadir producto al carrito (fila con información y cantidad)*/}
                {productos.map(product => {
                    const foundProd = allProducts.find(dbProd => dbProd._id == product._id);
                    if(foundProd) return <ProductSelectedCard key={foundProd._id} id={foundProd._id} nombreProducto={foundProd.nombre} precioVenta={foundProd.precioVenta} cantidad={product.cantidad} img={foundProd.img} /> ;
                })}
            </div>
        </div>
    )
}