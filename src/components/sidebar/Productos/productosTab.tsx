import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Producto } from "../../../tipos/Producto";
import { Paginador } from "../../elementos/Forms/paginador";
import SkeletonCard from "../../Skeletons/skeletonCard";
import VerProducto from "../../modal/verProducto";
import { notifyWarn } from "../../../utils/toastify";
import { FetchProductoByQuery, FetchProductos } from "../../../utils/fetches";
import UploadFile from "../../elementos/botones/uploadFile";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import DownloadFile from "../../elementos/botones/downloadFile";
import AddProducto from "../../modal/addProducto";
import NuevoBoton from "../../elementos/botones/nuevoBoton";

const arrayNum = [...Array(8)];

const ProductPage = () => {
    const [filtro, setFiltro] = useState<string>("");
    const [ProductosFiltrados, setProductosFiltradas] = useState<Producto[] | undefined>();
    const [addProdModal, setAddProdModal] = useState<boolean>(false);
    const [Productos, SetProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const GetAllData = async () => {
            SetProductos(await FetchProductos());
        }
        GetAllData();
    }, []);

    useEffect(() => {
        if (filtro === "") {
            setProductosFiltradas(undefined);
        }
    }, [filtro])


    const Filtrar = async (f: string) => {
        if (f === "") { return; }
        if (!f.match('^[-_a-zA-Z0-9.\s ]*$')) { notifyWarn("Producto inválido"); return; }

        setProductosFiltradas(await FetchProductoByQuery(f));
    }

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x">
            <div className="flex w-full h-auto py-4">
                <div className="flex gap-4 w-full h-full justify-start">
                    <NuevoBoton accionEvent={() => setAddProdModal(true)} />
                    <UploadFile tipoDocumento={TipoDocumento.Productos} />
                    <DownloadFile tipoDocumento={TipoDocumento.Productos} />
                </div>
                <div className="flex gap-2">
                    <input autoFocus={true} className="rounded-lg border appearance-none shadow-lg w-40 xl:w-96 h-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Buscar..."
                        onChange={(e) => { setFiltro(e.target.value); }} onKeyPress={async (e) => { e.key === "Enter" && await Filtrar(filtro) }} />

                    {
                        filtro ?
                            <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-purple-200"
                                onClick={async (e) => { e.preventDefault(); await Filtrar(filtro) }}>
                                Filtrar
                            </button>
                            :
                            <button disabled className="px-4 py-2 font-semibold text-white bg-blue-300 rounded-lg shadow-md cursor-default">
                                Filtrar
                            </button>
                    }
                </div>
            </div>
            <div className="flex justify-between border-t-2 border-x-2 rounded-t-2xl px-5 py-2">
                <div className="text-left text-sm font-semibold w-2/5">
                    Nombre
                </div>

                <div className="text-left text-sm font-semibold w-1/5">
                    Precio
                </div>
                <div className="text-left text-sm font-semibold w-1/5 ">
                    Familia
                </div>
                <div className="text-right text-sm font-semibold w-1/5">
                    Cantidad
                </div>
            </div>
            {
                ProductosFiltrados ?
                    <TablaProductos Productos={ProductosFiltrados} SetProductos={SetProductos} />
                    :
                    <TablaProductos Productos={Productos} SetProductos={SetProductos} />
            }
            <AnimatePresence>
                {addProdModal && <AddProducto showModal={setAddProdModal} />}
            </AnimatePresence>
        </div>
    );
}

const TablaProductos = (props: { Productos: Producto[], SetProductos: Function }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const elementsPerPage = 50;
    const numPages = Math.ceil(props.Productos.length / elementsPerPage);

    const setPaginaActual = (page: number) => {
        if (page < 1) { return; }
        if (page > numPages) { return; }

        setCurrentPage(page);
    }

    return (
        <>
            <div className="h-full w-full border-2 rounded-b overflow-y-scroll">
                {
                    props.Productos.length <= 0 ?
                        arrayNum.map((n, i) => {
                            return (
                                <SkeletonCard key={`SkeletonProdList-${i}`} />
                            );
                        })
                        :
                        props.Productos.slice((elementsPerPage * (currentPage - 1)), currentPage * elementsPerPage).map((p, index) => {
                            return (
                                <div key={`FilaProdTable${p._id}`}>
                                    <FilaProducto producto={p} productos={props.Productos} setAllProductos={props.SetProductos} />
                                </div>
                            );
                        })
                }
            </div>
            <div className="flex pt-2 items-center justify-center">
                <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
            </div>
        </>
    )
}

const FilaProducto = (props: { producto: Producto, productos: Producto[], setAllProductos: Function }) => {
    const [showModal, setModal] = useState<boolean>(false);
    const [producto, setProducto] = useState<Producto>(props.producto);

    const SetCurrentProduct = (p: Producto | null) => {
        if (p === null) {
            const prods = props.productos.filter((p) => { return p._id !== producto._id });
            props.setAllProductos(prods);

            return;
        }

        setProducto(p);
    }

    return (
        <div className="hover:bg-blue-200">
            <div className="flex justify-between border-b px-5 py-2 cursor-pointer" onClick={() => { setModal(true) }}>
                <div className="w-2/5 text-sm text-left">
                    {producto.nombre}
                </div>
                <div className="w-1/5 text-sm text-left">
                    {producto.precioVenta.toFixed(2)}€
                </div>
                <div className="w-1/5 text-base text-left">
                    {producto.familia}
                </div>
                <div className="w-1/5 text-sm text-right">
                    <span className={`w-full px-3 py-1 rounded-full ${producto.cantidad > 0 ? " text-green-900 bg-green-300" : "text-red-900 bg-red-300"}`}>
                        {producto.cantidad ? producto.cantidad : 0}
                    </span>
                </div>
            </div>
            <AnimatePresence>
                {showModal && <VerProducto showModal={setModal} producto={producto} setProducto={SetCurrentProduct} />}
            </AnimatePresence>
        </div>

    );
}

export default ProductPage;