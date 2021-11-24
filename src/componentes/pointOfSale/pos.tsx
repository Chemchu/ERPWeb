import {useState, useEffect} from 'react';
import {ProductCard, ProductSelectedCard} from './productCard';
import {POSProvider, useDBProducts, usePrice, useConsumerMoney, useSelectedProducts} from './productsContext';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion'; 
import { ModalPagar, ModalResumenCompra } from '../modal/modal';
import ClientProvider, { useDBClients } from './clientContext';
import { DBProduct } from '../../tipos/DBProduct';
import { FilteredProds } from '../../tipos/FilteredProducts';
import { Client } from '../../tipos/Client';
import { CustomerPaymentInformation } from '../../tipos/CustomerPayment';
import { OpModificacionProducto } from '../../tipos/Enums/OpModificaciones';
import { SelectedProduct } from '../../tipos/SelectedProduct';
import { TipoCobro } from '../../tipos/Enums/TipoCobro';
import { ApplyDtoCash, ApplyDtoPercentage, ValidatePositiveFloatingNumber } from '../../Validators';

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
    const [showModalCobro, setCobroModal] = useState(false);

    const [productos, ] = useSelectedProducts();
    const [precioTotal, ] = usePrice();
    const [dineroEntregado, ] = useConsumerMoney();

    const [allProducts, SetAllProductos] = useDBProducts();
    const [productosFiltrados, SetProductosFiltrados] = useState<DBProduct[]>([]);
    const [familias, setFamilias] = useState<string[]>([]);

    const [, setCustomers] = useDBClients();
    let clienteActual: Client = {nombre: "Genérico", calle: "Genérico", cp: "Genérico", nif: "Genérico"}

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
    }, []);

    useEffect(() => {
        function uniq_fast(a: DBProduct[]) {
            var seenMap: Map<string, number> = new Map();
            var out: string[] = [];
            var len = a.length;
            var j = 0;
            for(var i = 0; i < len; i++) {
                 var item = a[i].familia;
                 if(!seenMap.has(item)) {
                       seenMap.set(item, 1);
                       out[j++] = item;
                 }
            }
            return out;
        }
        setFamilias(uniq_fast(allProducts));
    }, [allProducts]);

    const cerrarModal = () => {
        setPagarModal(false);
    }

    const cerrarModalResumen = () => {
        setCobroModal(false);
    }

    const allProductsHaveQuantity = productos.filter(p => p.cantidad == "").length <= 0;

    return(
        <div>
            <div className="h-screen antialiased overflow-hidden text-gray-800">
                {/* Página principal del POS */}
                <div className="grid grid-cols-3 bg-gray-100">
                    {/* Menú tienda, donde se muestran los productos */}
                    <div className="col-span-2 h-screen">
                        <ProductDisplay listFiltrados={[productosFiltrados, SetProductosFiltrados]} familias={familias}/>
                    </div>
                    {/* Menú tienda */}
                    {/* Sidebar derecho */}
                    <div className="m-4">
                        <div className="bg-white rounded-3xl shadow">
                            {/* En caso de carrito vacío o con productos */}
                            {productos.length <= 0 ? 
                            <div className="">
                                <CarritoVacio productos={productos} precioTotal={precioTotal} /> 
                            </div>
                            : 
                            <CarritoConProductos productos={productos} precioTotal={precioTotal} allProductsHaveQuantity={allProductsHaveQuantity} abrirCobro={setPagarModal} abrirCobroRapido={setCobroModal}/> }
                        </div>
                    </div>
                </div>

                <AnimatePresence initial={false} exitBeforeEnter={true}>
                    {/* Modal aceptar compra */}
                    {showModalPagar && <ModalPagar handleClose={cerrarModal} cliente={clienteActual} customerProducts={productos} finalPrice={precioTotal} />}
                    {showModalCobro && <ModalResumenCompra customerPayment={{tipo: "Cobro rápido", efectivo: precioTotal, tarjeta: 0} as CustomerPaymentInformation} handleClose={cerrarModalResumen} cliente={clienteActual} cambio={0}
                                            customerProducts={productos} finalPrice={precioTotal} tipoCobro={TipoCobro.Efectivo}/>}
                </AnimatePresence>
            
            </div>
        </div>
    );
}

const ProductDisplay = (props: { listFiltrados: [DBProduct[], Function], familias: string[]}) => {
    const [productosFiltrados, SetProductosFiltrados] = props.listFiltrados;
    const [allProductos, ] = useDBProducts();

    var filtrarProd = (cadena: string) => {
        var prodFiltrados = allProductos.filter((prod: DBProduct) => prod.nombre.toLowerCase().includes(cadena.toLowerCase()));

        if(prodFiltrados.length <= 0) prodFiltrados = allProductos.filter((prod: DBProduct) => prod.ean.some(r => r == cadena));

        SetProductosFiltrados(prodFiltrados);
    }

    return (
        <div className="flex flex-col h-full w-full py-4">
            <div className="flex px-2 flex-row relative">
                <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-blue-400 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
                <input onChange={(e) => {filtrarProd(e.target.value);}} autoFocus={true} className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Buscar producto o código de barras..."/>
            </div>

            {/* Genera los botones de favorito */}
            {
                <GenerarFavoritos allProductos={allProductos} SetProductosFiltrados={SetProductosFiltrados} familias= {props.familias} />
            }

            <div className="h-full overflow-hidden pt-2">
                <div className="h-full overflow-y-auto overflow-x-hidden px-2">
                    {/* Base de datos vacía o con productos*/}
                    {
                        Object.keys(allProductos[0]).length === 0 ? 
                        <BBDDVacia/> 
                        : 
                        productosFiltrados.length <= 0 && allProductos.length > 0 ? <ProductoNoEncontrado/> : <GenerarProductsCards filteredProds={productosFiltrados}/>
                    }
                </div>
            </div>
        </div>
    )
}

const GenerarFavoritos = (props: {familias: string[], allProductos: DBProduct[], SetProductosFiltrados: Function}) => {
    return(
        props.familias[0] != undefined ?
        <div className="grid grid-rows-1 gap-2 m-4 grid-flow-col overflow-y-hidden">
            <button key={"Todos"} id={"Todos"} className="bg-blue-400 font-semibold hover:bg-yellow-500 text-white rounded-lg h-10 w-16 md:w-32 lg:w-48 mb-6"
                        onClick={() => props.SetProductosFiltrados(props.allProductos)}>Todos</button>
            {
                props.familias.map(f => {
                    return <button key={f} id={f} className="bg-blue-400 font-semibold hover:bg-yellow-500 text-white rounded-lg h-10 w-16 md:w-32 lg:w-48 mb-6"
                            onClick={(e) => props.SetProductosFiltrados(props.allProductos.filter(p => p.familia == e.currentTarget.id))}>{f}</button>
                })
            }
        </div>
        :
        null
    );
}

const BBDDVacia = () => {
    return(
        <div className="bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
            <div className="w-full text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            <p className="text-xl">
                FALLO DE CONEXIÓN
                <br />
                CON LA BBDD
            </p>
            </div>
        </div>
    );
}

const ProductoNoEncontrado = () => {
    return (
        <div className="bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
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
    const [, SetProductos] = useSelectedProducts();

    return(
        <div className="grid gap-4 pb-3 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 2xl:grid-cols-5
                            text-xs">
            {props.filteredProds.map((prod: DBProduct) => {
                return (
                    <button key={prod._id} id={prod._id} 
                        onClick={(e)=> {SetProductos(
                            {_id: e.currentTarget.id, cantidad: "1", dto: 0, ean: prod.ean, familia: prod.familia, img: prod.img, precioVenta: prod.precioVenta,
                             nombre: prod.nombre, operacionMod: OpModificacionProducto.Añadir} as SelectedProduct);} }>
                        <ProductCard _id={prod._id} alta={prod.alta} descripción={prod.descripción} ean={prod.ean} familia={prod.familia}
                                        nombre={prod.nombre} precioVenta={prod.precioVenta} img={prod.img} 
                                        iva={prod.iva} precioCompra={prod.precioCompra} tags={prod.tags} />
                    </button>
                );
            })}
        </div>
    );
}

const CarritoVacio = (props: {productos: SelectedProduct[], precioTotal: number} ) => {
    return(
        <div className="grid grid-rows-2 grid-cols-1 h-screen p-4 opacity-25">
            <div className="grid grid-rows-2 grid-cols-1 justify-items-center justify-self-center self-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="self-center">
                    CARRITO VACÍO
                </p>
            </div>

            <div className="row-start-6 row-end-7 flex mb-3 text-lg font-semibold text-blue-gray-700 self-end">
                <div>TOTAL</div>
                <div className="text-right w-full">
                    {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                    {props.productos.length <= 0 ? 0 : props.precioTotal} €
                </div>
            </div>
        </div>
    );
}

const CarritoConProductos = (props: {productos: SelectedProduct[], precioTotal: number, allProductsHaveQuantity: boolean, abrirCobro: Function, abrirCobroRapido: Function} ) => {
    const [productos, AddProductos] = useSelectedProducts();
    const [allProducts, ] = useDBProducts();
    const [descuentoOpen, setDescuentoPupup] = useState<boolean>(false);

    const [dtoEfectivo, setDtoEfectivo] = useState<string>("0");
    const [dtoPorcentaje, setDtoPorcentaje] = useState<string>("0");

    return (
        <div className="flex flex-col h-screen mb-4">
            <div className="text-center">
                <div className="grid grid-cols-2">
                    <div className="pl-8 text-left text-lg py-4 relative">
                        {/* Icono carrito */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <div className="text-center absolute text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3"/>
                        {` ${productos.length}`}
                    </div>
                    <div className="px-8 text-right text-lg py-4 relative">
                        {/* Boton basura */}
                        <button className="text-blue-gray-300 hover:text-red-700 focus:outline-none" onClick={() => {AddProductos(null)}}> 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-grow gap-2 px-2 overflow-scroll overflow-x-hidden">
                {/* Añadir producto al carrito (fila con información y cantidad)*/}
                {productos.map(product => {
                    const foundProd = allProducts.find(dbProd => dbProd._id == product._id) as DBProduct;
                    if(foundProd) 
                    {
                        return (
                        <div key={`prodCarrito${foundProd._id}`}>
                            <ProductSelectedCard key={foundProd._id} _id={foundProd._id} cantidad={product.cantidad}
                                dto={product.dto} precioVenta={foundProd.precioVenta} img={foundProd.img} nombre={foundProd.nombre} 
                                familia={foundProd.familia} ean={foundProd.ean} operacionMod={OpModificacionProducto.Añadir}/> 
                        </div>);
                    }
                })}
            </div>
            <div className="text-center p-4 mb-4">
                <div>
                    {descuentoOpen &&                     
                        <div className="h-auto">
                            <div className="flex text-left text-sm">
                                <div className="flex self-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <div>
                                        <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-1/2 h-6 shadow" name="DtoEfectivo" value={dtoEfectivo}
                                            onChange={(e) => { 
                                                setDtoEfectivo(ValidatePositiveFloatingNumber(e.target.value));
                                            }}
                                        />
                                        €
                                    </div>
                                </div>

                                <div className="flex ml-auto gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <div>
                                        <input type="text" inputMode="numeric" className="text-xs text-center rounded-lg w-1/2 h-6 shadow" name="DtoPorcentaje" value={dtoPorcentaje}
                                            onChange={(e) => {
                                                setDtoPorcentaje(ValidatePositiveFloatingNumber(e.target.value));
                                            }}
                                        />
                                        %
                                    </div>
                                </div>
                            </div>
                            <hr className="border-black w-full py-2 mt-4"/>
                        </div>
                    }
                    <div className="flex flex-col text-left text-lg font-semibold hover:text-blue-500 underline cursor-pointer" onClick={() => setDescuentoPupup(!descuentoOpen)}>
                        Descuento
                    </div>
                </div>
                <div className="flex mb-3 text-lg font-semibold">
                    <div>Total</div>
                    {
                        (dtoEfectivo != "" && dtoEfectivo != "0") || (dtoPorcentaje != "" && dtoPorcentaje != "0") ? 
                        <div className="flex gap-2 justify-end ml-auto">
                            <div className="text-right w-full text-red-500 line-through">
                                {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                {productos.length <= 0 ? 0.00 : props.precioTotal.toFixed(2)} €
                            </div>
                            <div className="text-right w-full">
                                {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                                {productos.length <= 0 ? 0.00 : ApplyDtoPercentage(ApplyDtoCash(props.precioTotal, Number(dtoEfectivo)), Number(dtoPorcentaje)).toFixed(2)} €
                            </div>
                        </div>                        
                        :
                        <div className="text-right w-full">
                            {/*Cambiar en caso de que la cesta tenga productos y calcular el valor total*/}
                            {productos.length <= 0 ? 0.00 : props.precioTotal.toFixed(2)} €
                        </div>
                    }
                    
                </div>

                {
                    productos.length > 0 && !isNaN(props.precioTotal) && props.allProductsHaveQuantity &&
                    <div className="grid grid-cols-1 gap-2 h-auto">
                        <motion.button whileTap={{scale: 0.9}} className="bg-blue-500 h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none" onClick={ (e) => {props.abrirCobro(true)} }>PAGAR</motion.button>
                        <motion.button whileTap={{scale: 0.9}} className="bg-blue-500 h-12 shadow rounded-lg hover:shadow-lg hover:bg-blue-600 text-white focus:outline-none" onClick={ (e) => {props.abrirCobroRapido(true)} }>COBRO RAPIDO</motion.button>
                    </div>
                }
            </div>
        </div>
    )
}