import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Producto } from "../../../tipos/Producto";
import { Paginador } from "../../elementos/Forms/paginador";
import SkeletonCard from "../../Skeletons/skeletonCard";
import VerProducto from "../../modal/verProducto";
import { notifyWarn } from "../../../utils/toastify";
import UploadFile from "../../elementos/botones/uploadFile";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import DownloadProductsFile from "../../elementos/botones/downloadProductsFile";
import AddProducto from "../../modal/addProducto";
import NuevoBoton from "../../elementos/botones/nuevoBoton";
import { FetchProductoByQuery, FetchProductos } from "../../../utils/fetches/productosFetches";
import { ValidateSearchString } from "../../../utils/validator";
import SimpleListBox from "../../elementos/Forms/simpleListBox";
import { TipoProductos } from "../../../tipos/Enums/TipoProductos";
import FiltrarInput from "../../elementos/input/filtrarInput";

const arrayNum = [...Array(8)];

const ProductPage = () => {
  const [filtro, setFiltro] = useState<string>("");
  const [ProductosFiltrados, setProductosFiltradas] = useState<Producto[] | undefined>();
  const [addProdModal, setAddProdModal] = useState<boolean>(false);
  const [Productos, SetProductos] = useState<Producto[]>([]);
  const [tipoProductos, setTipoProductos] = useState<TipoProductos>(TipoProductos.Todos);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(true);

  useEffect(() => {
    const GetAllData = async () => {
      SetProductos(await FetchProductos());
      setLoading(false);
      setIsMounted(true);
    };
    GetAllData();
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const GetAllData = async () => {
      if (filtro) {
        if (!ValidateSearchString(filtro)) {
          notifyWarn("Producto inválido");
          return;
        }

        setProductosFiltradas(await FetchProductoByQuery(filtro, tipoProductos));
      } else {
        SetProductos(await FetchProductos(tipoProductos));
      }
    };
    GetAllData();
  }, [tipoProductos]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (filtro === "") {
      setProductosFiltradas(undefined);
    }
  }, [filtro]);

  const Filtrar = async () => {
    if (!isMounted) {
      return;
    }

    if (filtro === "") {
      return;
    }
    if (!ValidateSearchString(filtro)) {
      notifyWarn("Producto inválido");
      return;
    }

    setProductosFiltradas(await FetchProductoByQuery(filtro, tipoProductos));
  };

  const SetTipoProductos = (e: string) => {
    setTipoProductos(TipoProductos[e as keyof typeof TipoProductos]);
  };

  return (
    <div className="flex flex-col gap-4 h-full w-full bg-white sm:rounded-bl-3xl sm:rounded-tr-3xl p-4 shadow-lg border-x">
      <div className="flex justify-end w-full h-auto">
        <div className="hidden sm:flex gap-4 w-full h-full justify-start items-center">
          <div>
            <NuevoBoton accionEvent={() => setAddProdModal(true)} />
          </div>
          <div className="hidden md:inline-block">
            <UploadFile tipoDocumento={TipoDocumento.Productos} extension={["csv"]} />
          </div>
          <div className="hidden md:inline-block">
            <DownloadProductsFile productos={Productos} />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-2/3 sm:max-w-xs">
          <div className="flex w-full gap-2 items-center justify-end">
            <FiltrarInput filtro={filtro} setFiltro={setFiltro} FiltrarCallback={Filtrar} />
          </div>
          <SimpleListBox
            elementos={[TipoProductos.Todos, TipoProductos.Alta, TipoProductos.Baja]}
            setElemento={SetTipoProductos}
            defaultValue={TipoProductos.Todos}
          />
        </div>
      </div>
      <TablaProductos isLoading={isLoading} Productos={ProductosFiltrados || Productos} SetProductos={SetProductos} />
      <AnimatePresence>{addProdModal && <AddProducto showModal={setAddProdModal} />}</AnimatePresence>
    </div>
  );
};

const TablaProductos = (props: { isLoading: boolean; Productos: Producto[]; SetProductos: Function }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const elementsPerPage = 50;
  const numPages = Math.ceil(props.Productos.length / elementsPerPage);

  const setPaginaActual = (page: number) => {
    if (page < 1) {
      return;
    }
    if (page > numPages) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-full h-10 grow">
      <div className="flex border-t-2 border-x-2 rounded-t-2xl px-5 py-2">
        <div className="text-left font-semibold w-full sm:w-2/5">Nombre</div>
        <div className="text-right sm:text-left font-semibold w-full sm:w-1/5">Precio</div>
        <div className="text-left hidden sm:block font-semibold w-1/5">Familia</div>
        <div className="text-right hidden sm:block font-semibold w-1/5">Cantidad</div>
      </div>
      {props.isLoading ? (
        <div className="h-full w-full border-2 rounded-b overflow-y-scroll">
          {arrayNum.map((n, i) => {
            return <SkeletonCard key={`SkeletonProdList-${i}`} />;
          })}
        </div>
      ) : (
        <>
          <div className="flex flex-col h-full w-full border-2 rounded-b overflow-y-scroll">
            {props.Productos.length <= 0 ? (
              <div className="flex justify-center items-center h-full w-full text-xl">
                No se ha encontrado registros de productos en el sistema
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {props.Productos.slice(elementsPerPage * (currentPage - 1), currentPage * elementsPerPage).map((p) => {
                  return (
                    <div key={`FilaProdTable${p._id}`} className="w-full">
                      <FilaProducto producto={p} productos={props.Productos} setAllProductos={props.SetProductos} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex h-auto pt-2 items-start justify-center">
            <Paginador
              numPages={numPages}
              paginaActual={currentPage}
              maxPages={5}
              cambiarPaginaActual={setPaginaActual}
            />
          </div>
        </>
      )}
    </div>
  );
};

const FilaProducto = (props: { producto: Producto; productos: Producto[]; setAllProductos: Function }) => {
  const [showModal, setModal] = useState<boolean>(false);
  const [producto, setProducto] = useState<Producto>(props.producto);

  const SetCurrentProduct = (p: Producto | null) => {
    if (p === null) {
      const prods = props.productos.filter((p) => {
        return p._id !== producto._id;
      });
      props.setAllProductos(prods);

      return;
    }

    setProducto(p);
  };

  return (
    <div className="hover:bg-blue-200">
      <div
        className="flex justify-between border-b px-5 py-2 cursor-pointer"
        onClick={() => {
          setModal(true);
        }}
      >
        <div className="w-full sm:w-2/5 text-left md:truncate">{producto.nombre}</div>
        <div className="w-full sm:w-1/5 text-right sm:text-left">{producto.precioVenta.toFixed(2)}€</div>
        <div className="w-1/5 hidden sm:block text-left md:truncate">{producto.familia}</div>
        <div className="hidden sm:flex justify-end w-1/5 text-right">
          <span
            className={`flex items-center justify-center w-12 px-3 py-1 rounded-full ${
              producto.cantidad > 0 ? " text-green-900 bg-green-300" : "text-red-900 bg-red-300"
            }`}
          >
            {producto.cantidad ? producto.cantidad : 0}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {showModal && <VerProducto showModal={setModal} producto={producto} setProducto={SetCurrentProduct} />}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
