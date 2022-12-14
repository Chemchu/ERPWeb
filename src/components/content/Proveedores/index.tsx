import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Roles } from "../../../tipos/Enums/Roles";
import { Proveedor } from "../../../tipos/Proveedor";
import { DeleteProveedor, FetchProveedores } from "../../../utils/fetches/proveedorFetches";
import { notifyWarn } from "../../../utils/toastify";
import { ValidateSearchString } from "../../../utils/validator";
import AuthorizationWrapper from "../../authorizationWrapper";
import NuevoBoton from "../../elementos/botones/nuevoBoton";
import { Paginador } from "../../elementos/Forms/paginador";
import FiltrarInput from "../../elementos/input/filtrarInput";
import AddProveedorModal from "../../modal/addProveedor";
import VerProveedor from "../../modal/verProveedor";
import SkeletonCard from "../../Skeletons/skeletonCard";

const ProveedoresPage = () => {
  const [filtro, setFiltro] = useState<string>("");
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [showAddProveedor, setShowAddProveedor] = useState<boolean>(false);

  useEffect(() => {
    const GetData = async () => {
      const prov: Proveedor[] = await FetchProveedores();
      setProveedores(prov)
    }
    GetData()
  }, []);

  const OkCallback = async () => {
    const p = await FetchProveedores();
    setProveedores(p)
  }

  const Filtrar = async () => {
    if (filtro === "") {
      return;
    }
    if (!ValidateSearchString(filtro)) {
      notifyWarn("Proveedor inválido");
      return;
    }

    // setProductosFiltradas(await FetchProductoByQuery(f, tipoProductos));
  };

  const EliminarElemento = (id: String) => {
    const prov = proveedores.filter((proveedor) => proveedor._id !== id)

    setProveedores(prov);
  }

  return (
    <main className="flex flex-col gap-4 w-full h-full max-h-full bg-white border-x border-b sm:rounded-bl-3xl sm:rounded-tr-3xl shadow-lg p-4">
      <section className="flex sm:justify-between justify-end items-start w-full">
        <div className="hidden sm:block">
          <NuevoBoton accionEvent={() => setShowAddProveedor(true)} />
        </div>
        <div className="flex w-full gap-2 items-center justify-end">
          <FiltrarInput filtro={filtro} setFiltro={setFiltro} FiltrarCallback={Filtrar} />
        </div>
      </section>
      <ProveedorTable isLoading={false} eliminarFila={EliminarElemento} proveedores={proveedores} />
      <AnimatePresence>{showAddProveedor && <AddProveedorModal showModal={setShowAddProveedor} okCallback={OkCallback} />}</AnimatePresence>
    </main>
  );
};

const arrayNum = [...Array(8)];

const ProveedorTable = (props: { isLoading: boolean; proveedores: Proveedor[]; eliminarFila: Function }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const elementsPerPage = 50;
  const numPages = Math.ceil(props.proveedores.length / elementsPerPage);

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
      <div className="flex justify-between border-t-2 border-x-2 rounded-t-2xl px-3 py-2">
        <div className="text-left font-semibold">Nombre</div>
        <div className="hidden sm:block text-left font-semibold">Localidad</div>
        <div className="text-left font-semibold ">Teléfono</div>
        <div className="text-right font-semibold">Correo</div>
      </div>
      {props.isLoading ? (
        <div className="h-full w-full border-2 rounded-b overflow-y-scroll">
          {arrayNum.map((_, i) => {
            return <SkeletonCard key={`SkeletonProdList-${i}`} />;
          })}
        </div>
      ) : (
        <>
          <div className="h-full w-full border-2 rounded-b overflow-y-scroll">
            {props.proveedores.length <= 0 ? (
              <div className="flex justify-center items-center h-full w-full text-xl p-4">
                No se ha encontrado registros de proveedores en el sistema (todavía en desarrollo)
              </div>
            ) : (
              props.proveedores
                .slice(elementsPerPage * (currentPage - 1), currentPage * elementsPerPage)
                .map((p) => {
                  return (
                    <div key={`FilaProdTable${p._id}`}>
                      <FilaProveedor proveedor={p} eliminarse={() => props.eliminarFila(p._id)} />
                    </div>
                  );
                })
            )}
          </div>
          <div className="flex pt-2 items-center justify-center">
            <Paginador
              numPages={numPages}
              paginaActual={currentPage}
              maxPages={10}
              cambiarPaginaActual={setPaginaActual}
            />
          </div>
        </>
      )}
    </div>
  );
};

const FilaProveedor = (props: { proveedor: Proveedor, eliminarse: Function }) => {
  const [showModal, setModal] = useState<boolean>(false);
  const [proveedor, setProveedor] = useState<Proveedor>(props.proveedor);

  if (!props.proveedor.nombre) { return null }

  const Eliminar = async () => {
    const deletedCorrectly = await DeleteProveedor(props.proveedor._id);

    if (deletedCorrectly) {
      setModal(false);
      props.eliminarse()
    }
  };


  return (
    <div className="hover:bg-blue-200">
      <div
        className="flex justify-between border-b px-3 py-2 cursor-pointer"
        onClick={() => {
          setModal(true);
        }}
      >
        <div className="text-left truncate">{proveedor.nombre}</div>
        <div className="hidden sm:block text-left">{proveedor.localidad}</div>
        <div className="text-left truncate">{proveedor.telefono}</div>
        <div className="text-right">{proveedor.email}</div>
      </div>
      <AnimatePresence>
        {showModal && <VerProveedor showModal={setModal} proveedor={proveedor} deleteCallback={Eliminar} setProveedor={setProveedor} />}
      </AnimatePresence>
    </div>
  );
};

export default AuthorizationWrapper([Roles.Administrador, Roles.Gerente], true)(ProveedoresPage);
