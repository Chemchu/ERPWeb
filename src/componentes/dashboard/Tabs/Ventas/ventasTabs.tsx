import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DBClient } from "../../../../tipos/DBClientes";
import { DBProduct } from "../../../../tipos/DBProduct";
import { DBSale } from "../../../../tipos/DBSale";
import { JSONBuffer } from "../../../../tipos/JsonBuffer";
import { ConvertBufferToBase64 } from "../../../../Validators";

const variants= {
    initial: {
        opacity: 0       
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      },
      exit: {
        y: '-100vh',
        opacity: 0,
        transition:{ 
            ease: [0.87, 0, 0.13, 1], 
            duration: 1
        }
    },
  }

export const SalesPage = () => {
    const [ventas, setVentas] = useState<DBSale[]>([]);
    const [clientes, setClientes] = useState<DBClient[]>([]);
    const [selectedPage, setPage] = useState<number>(1);

    const elementsPerPage = 1;
    const numPages = ventas.length <= 0 ? 1 : Math.ceil(ventas.length / elementsPerPage);

    useEffect(() => {
        const fetchClientes = async () => {
            const erpBackURL = process.env.REACT_APP_ERP_BACKURL;

            const resClientes = await axios.get(`${erpBackURL}api/clientes`);
            setClientes([...resClientes.data.message]);      
        };
        fetchClientes();
    }, []);

    useEffect(() => {
        const fetchVentas = async () => {
            const erpBackURL = process.env.REACT_APP_ERP_BACKURL;

            const resVentas = await axios.get(`${erpBackURL}api/ventas`)
            UpdateVentas([...resVentas.data.message], clientes);
        };
        fetchVentas();        
    }, [clientes]);

    

    const UpdateVentas = (ventas: Array<any>, clientes: DBClient[]): void => {
        let ventasFormatted: Array<DBSale> = [];
        ventas.forEach((v: DBSale) => {
            const nombreCliente = clientes.find(c => c._id == v.cliente)?.nombre;
            const sale: DBSale = {
                _id: v._id,
                cliente: nombreCliente || "General",
                productos: v.productos,
                descuentoEfectivo: v.descuentoEfectivo,
                descuentoTarjeta: v.descuentoTarjeta,
                dineroEntregadoEfectivo: v.dineroEntregadoEfectivo,
                dineroEntregadoTarjeta: v.dineroEntregadoTarjeta,
                precioVentaTotal: v.precioVentaTotal,
                cambio: v.cambio,
                tipo: v.tipo,
                vendidoPor: v.vendidoPor,
                modificadoPor: v.modificadoPor,
                createdAt: v.createdAt,
                updatedAt: v.updatedAt
            }            
            ventasFormatted.push(sale);
        });
        setVentas(ventasFormatted);
    }

    const setPaginaActual = (page: number) => {
        if(page < 1) { return; }
        if(page > numPages) { return; }

        setPage(page);
    }

    return(
        <motion.div className="flex flex-col h-screen antialiased mx-8 py-8" initial={variants.initial} animate={variants.animate} exit={variants.exit}>
            <div className="text-center">
                <div className="flex mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="text-2xl leading-tight">
                        Ventas
                    </h2>
                    <div className="text-end">
                        <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                            <div className=" relative ">
                                <input type="text" id="&quot;form-subscribe-Filter" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Producto a buscar..."/>
                            </div>
                            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                Filtrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-full mt-4 pb-10">
                <div className="bg-white grid grid-cols-4 justify-evenly  border-b-2 rounded-t-xl ">
                    <div className="px-5 py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                        Cliente
                    </div>
                    <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                        Fecha de compra
                    </div>
                    <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                        Método de pago
                    </div>
                    <div className="py-3 border-gray-200 text-gray-800 text-left text-sm font-semibold">
                        Valor total
                    </div>
                </div>
                <div className="bg-white flex flex-col border-b-4 overflow-scroll overflow-x-hidden">
                    {ventas.slice((elementsPerPage * (selectedPage - 1)), selectedPage * elementsPerPage).map((v) => {
                        return(
                            <div key={`FilaProdTable${v._id}`}>
                                <FilaVenta key={`FilaVenta${v._id}`} IDCompra={v._id} nombreCliente={v.cliente} fechaCompra={v.createdAt} metodoPago={v.tipo} valorTotal={v.precioVentaTotal} />
                            </div>
                        );
                    })}                      
                </div>
                <div className="bg-white flex flex-row p-5 items-center justify-center rounded-b-xl shadow-lg">
                    <Paginador numPages={numPages} paginaActual={selectedPage} cambiarPaginaActual={setPaginaActual}/>
                </div>
            </div>
        </motion.div>
    );
}

const Paginador = (props: {numPages: number, paginaActual: number, cambiarPaginaActual: Function}) => {
    const maxPages = 10;
    const offset = props.paginaActual > Math.ceil(maxPages / 2) + 1 ? props.paginaActual - (Math.ceil(maxPages/ 2) + 1 ) : 0;
    const numBtns = [...Array(props.numPages).keys()];
    const sliceLength = numBtns.slice(offset, offset + maxPages).length;

    function slice2(array: number[], chunk: number, offset: number){
        var end = offset + chunk,
            out = array.slice(offset, end);  // Get the chunk
        if(array.length < end){              // If the chunk should wrap
            out = out.concat(array.slice(0, end - array.length)); // Concatenate a the rest of the chunk, from the start of the array, to the output.
        }
        return out;
    }


    return(
        <div className="flex items-center">
            <button className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                onClick={() => {props.cambiarPaginaActual(props.paginaActual - 1);}}>
                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                    </path>
                </svg>
            </button>
            {
                sliceLength < maxPages ? 
                numBtns.slice(props.numPages - maxPages, props.numPages).map((n) => {
                    return(
                        <button key={`paginador${n}`} className={`w-full px-4 py-2 border-t border-b text-base ${n + 1 == props.paginaActual ? "text-blue-700 font-semibold bg-gray-200" : "text-gray-600 hover:bg-gray-100 bg-white" }`}
                            onClick={() => {props.cambiarPaginaActual(n+1);}}>
                            {n + 1}
                        </button>
                    );   
                })
                :
                numBtns.slice(offset, offset + maxPages).map((n) => {
                    return(
                        <button key={`paginador${n}`} className={`w-full px-4 py-2 border-t border-b text-base ${n + 1 == props.paginaActual ? "text-blue-700 font-semibold bg-gray-200" : "text-gray-600 hover:bg-gray-100 bg-white" }`}
                            onClick={() => {props.cambiarPaginaActual(n+1);}}>
                            {n + 1}
                        </button>
                    );   
                })
            }
            
            <button className="w-full p-4 border text-base rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                onClick={() => {props.cambiarPaginaActual(props.paginaActual + 1);}}>
                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                    </path>
                </svg>
            </button>
        </div>
    );
}

const FilaVenta = (props: {IDCompra: string, nombreCliente: string, fechaCompra: string, metodoPago: string, valorTotal: number}) => {
    return(
        <div className="grid grid-cols-4 w-full justify-evenly gap-x-6 border-t">
            <div className="px-5 py-5 border-gray-200 text-sm">
                <p className="text-gray-900">
                    {props.nombreCliente}
                </p>
            </div>
            <div className="py-5 border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.fechaCompra}
                </p>
            </div>
            <div className="py-5 border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.metodoPago}
                </p>
            </div>
            <div className="py-5 border-gray-200 text-lg">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.valorTotal}€
                </p>
            </div>
        </div>
    );
}