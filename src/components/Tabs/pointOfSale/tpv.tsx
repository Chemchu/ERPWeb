import { useEffect, useState } from "react";
import { CreateProductList } from "../../../pages/api/typeCreator";
import { ValidateString } from "../../../pages/api/validator";
import { DBProduct } from "../../../tipos/DBProduct";

const TPV = (props: { productos: any, clientes: any }) => {
    const [Busqueda, setBusqueda] = useState<string>("");
    const [Productos, setProductos] = useState<DBProduct[]>([]);
    const [ProductosFiltrados, setProductosFiltrados] = useState<DBProduct[]>([]);
    const [Familias, setFamilias] = useState<string[]>([]);

    useEffect(() => {
        // SetAllProductos([...props.productos]);
        // SetProductosFiltrados([...props.productos]);
        // setCustomers([...props.clientes]);
        setProductos(CreateProductList(props.productos));
    }, []);

    var Filtrar = (cadena: string) => {
        const stringValidated = ValidateString(cadena);

        if (stringValidated) {
            setBusqueda(stringValidated);

            const pFiltrados = Productos.filter((p: DBProduct) => { p.nombre.toUpperCase().includes(stringValidated.toUpperCase()) || p.ean.includes(stringValidated) });
            setProductosFiltrados(pFiltrados);
        }
        else { return; }
    }

    return (
        <div className="h-screen antialiased overflow-hidden text-gray-800">
            {/* Página principal del POS */}
            <div className="grid grid-cols-3 bg-gray-100">
                {/* Menú tienda, donde se muestran los productos */}
                <div className="col-span-2 h-screen">
                    <div className="flex flex-col h-full w-full py-4">
                        <div className="flex px-2 flex-row relative">
                            <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-blue-400 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input onChange={(e) => { Filtrar(e.target.value); }} value={Busqueda} autoFocus={true} className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Buscar producto o código de barras..." />
                        </div>

                        {/* Genera los botones de favorito */}
                        {
                            Familias[0] != undefined ?
                                <div className="grid grid-rows-1 gap-2 m-4 grid-flow-col overflow-y-hidden">
                                    <button key={"Todos"} id={"Todos"} className="bg-blue-400 font-semibold hover:bg-yellow-500 text-white rounded-lg h-10 w-16 md:w-32 lg:w-48 mb-6"
                                        onClick={() => props.SetProductosFiltrados(props.allProductos)}>Todos</button>
                                    {
                                        Familias.map(f => {
                                            return <button key={f} id={f} className="bg-blue-400 font-semibold hover:bg-yellow-500 text-white rounded-lg h-10 w-16 md:w-32 lg:w-48 mb-6"
                                                onClick={(e) => props.SetProductosFiltrados(props.allProductos.filter(p => p.familia == e.currentTarget.id))}>{f}</button>
                                        })
                                    }
                                </div>
                                :
                                null
                        }

                        <div className="h-full overflow-hidden pt-2">
                            <div className="h-full overflow-y-auto overflow-x-hidden px-2">
                                {/* Base de datos vacía o con productos*/}
                                {
                                    Object.keys(allProductos[0]).length === 0 ?
                                        <BBDDVacia />
                                        :
                                        productosFiltrados.length <= 0 && allProductos.length > 0 ? <ProductoNoEncontrado /> : <GenerarProductsCards filteredProds={productosFiltrados} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Menú tienda */}
                {/* Sidebar derecho */}
                <div className="m-4">
                    <div className="bg-white rounded-3xl shadow">
                        {/* En caso de carrito vacío o con productos */}
                        {productos.length <= 0 ?
                            <CarritoVacio productos={productos} precioTotal={precioTotal} />
                            :
                            <CarritoConProductos productos={productos} precioTotal={precioTotal} allProductsHaveQuantity={allProductsHaveQuantity} abrirCobro={setPagarModal} abrirCobroRapido={setCobroModal} />}
                    </div>
                </div>
            </div>

            {/* Modal aceptar compra */}
            {/* <AnimatePresence initial={false} exitBeforeEnter={true}>
                {showModalPagar && <ModalPagar handleClose={cerrarModal} cliente={clienteActual} customerProducts={productos} finalPrice={precioTotal} />}
                {showModalCobro && <ModalResumenCompra customerPayment={{ tipo: "Cobro rápido", efectivo: precioTotal, tarjeta: 0 } as CustomerPaymentInformation} handleClose={cerrarModalResumen} cliente={clienteActual} cambio={0}
                    customerProducts={productos} finalPrice={precioTotal} tipoCobro={TipoCobro.Efectivo} />}
            </AnimatePresence> */}

        </div>
    );
}

export default TPV;