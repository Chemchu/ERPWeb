import {useState, useEffect, useRef} from 'react';
import {ProductCard, ProductSelectedCard} from './productCard';
import {POSProvider, useDBProducts, usePrice, useConsumerMoney, useSelectedProducts} from './productsContext';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion'; 
import { ModalPagar } from '../modal/modal';
import ClientProvider, { useCurrentClient, useDBClients } from './clientContext';
import { DBProduct } from '../../tipos/DBProduct';
import { FilteredProds } from '../../tipos/FilteredProducts';

export const POS = () => {
    return(
        <POSProvider key={"undefined"} type={"undefined"} props={undefined}>
            <ClientProvider key={"undefined2"} type={"undefined2"} props={undefined}>
                <POSComponent/>
            </ClientProvider>
        </POSProvider>
    );
}

const POSComponent = () => {
    const [showModalPagar, setPagarModal] = useState(false);

    const [productos, ] = useSelectedProducts();
    const [precioTotal, ] = usePrice();
    const [dineroEntregado, setDineroEntregado] = useConsumerMoney();

    const [, SetAllProductos] = useDBProducts();
    const [productosFiltrados, SetProductosFiltrados] = useState<DBProduct[]>([]);

    const [, setCustomers] = useDBClients();
    const [cliente, setCliente] = useCurrentClient();

    const [isEfectivo, setIsEfectivo] = useState<boolean>(false);
    const montado = useRef(false);

    useEffect(() => {
        const fetchProductos = () => {
            const erpBackURL = process.env.REACT_APP_ERP_BACKURL;
            axios.get(`${erpBackURL}api/productos`).then(
                (res) => {
                    SetAllProductos([...res.data.message]);
                    SetProductosFiltrados([...res.data.message]);
                }
            );
            axios.get(`${erpBackURL}api/clientes`).then(
                (res) => {
                    setCustomers([...res.data.message]);
                }
            );
        };
        fetchProductos();
        montado.current = true;
    }, []);

    useEffect(() => {
        if(!montado.current) {return;}
        else setPagarModal(true);
        
    }, [isEfectivo])

    const cerrarModal = () => {
        setPagarModal(false);
    }

    const cambio = parseFloat((parseFloat(dineroEntregado) - precioTotal).toFixed(2));
    const botonPagarColores = cambio >= 0 ? "bg-blue-500 h-12 shadow text-white rounded-lg hover:shadow-lg hover:bg-blue-600 focus:outline-none" : "bg-blue-300 h-12 shadow text-white rounded-lg hover:shadow-lg focus:outline-none cursor-default"
    const allProductsHaveQuantity = productos.filter(p => p.cantidad == "").length <= 0;

    return(
        <div>
            <div className="hide-print flex flex-row h-screen antialiased text-gray-800">
            {/* Página principal del POS */}
            <div className="flex-grow flex">
                {/* Menú tienda, donde se muestran los productos */}
                <ProductDisplay listFiltrados={[productosFiltrados, SetProductosFiltrados]}/>
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

                            {
                                productos.length > 0 && !isNaN(precioTotal) && allProductsHaveQuantity &&
                                <div className="grid grid-cols-1 gap-2 mt-2">
                                    <motion.button whileTap={{scale: 0.9}} className="bg-blue-500 h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none" onClick={ (e) => {setPagarModal(true)} }>PAGAR</motion.button>
                                </div>
                            }
                        </div>
                        {/* end of payment info */}
                    </div>
                </div>
                {/* Fin sidebar derecho */}
            </div>

            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {/* Modal aceptar compra */}
                {showModalPagar && <ModalPagar handleClose={cerrarModal} cliente={cliente} customerProducts={productos} finalPrice={precioTotal}/>}
            </AnimatePresence>
            
            </div>
            {/* end of noprint-area */}
            <div id="print-area" className="print-area" />
        </div>
    );
}

const ProductDisplay = (props: { listFiltrados: [DBProduct[], Function]; }) => {
    const [productosFiltrados, SetProductosFiltrados] = props.listFiltrados;
    const [allProductos, ] = useDBProducts();

    var filtrarProd = (cadena: string) => {
        var prodFiltrados = allProductos.filter((prod: DBProduct) => prod.nombre.toLowerCase().includes(cadena.toLowerCase()));

        if(prodFiltrados.length <= 0) prodFiltrados = allProductos.filter((prod: DBProduct) => prod.ean.some(r => r == cadena));

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
                    {productosFiltrados.length <= 0 && allProductos.length > 0 ? <ProductoNoEncontrado/> : <GenerarProductsCards filteredProds={productosFiltrados}/>}
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

const GenerarProductsCards = (props: FilteredProds) => {
    const [productosSeleccionados, SetProductos] = useSelectedProducts();
    return(
        <div className="grid grid-cols-4 gap-4 pb-3">
            {props.filteredProds.map((prod: DBProduct) => {
                return (
                    <button key={prod._id} id={prod._id} 
                        onClick={(e)=> {SetProductos(
                            {_id: e.currentTarget.id, cantidad: "1", dto: 0, ean: prod.ean, familia: prod.familia, img: prod.img, precioVenta: prod.precioVenta, nombre: prod.nombre, operacionMod: "add"});} }>
                        <ProductCard _id={prod._id} alta={prod.alta} descripción={prod.descripción} ean={prod.ean} familia={prod.familia}
                                        nombre={prod.nombre} precioVenta={prod.precioVenta} img={prod.img} 
                                        iva={prod.iva} precioCompra={prod.precioCompra} tags={prod.tags} />
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

const CarritoConProductos = () => {
    const [productos, AddProductos] = useSelectedProducts();
    const [allProducts, ] = useDBProducts();

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
                    <button className="text-blue-gray-300 hover:text-pink-500 focus:outline-none" onClick={() => {AddProductos(null)}}> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex-1 w-full px-4 overflow-auto">
                {/* Añadir producto al carrito (fila con información y cantidad)*/}
                {productos.map(product => {
                    const foundProd = allProducts.find(dbProd => dbProd._id == product._id) as DBProduct;
                    if(foundProd) 
                    {
                        return <ProductSelectedCard key={foundProd._id} _id={foundProd._id} cantidad={product.cantidad}
                                dto={product.dto} precioVenta={foundProd.precioVenta} img={foundProd.img} nombre={foundProd.nombre} 
                                familia={foundProd.familia} ean={foundProd.ean} operacionMod={""}/> ;
                    }
                })}
            </div>
        </div>
    )
}