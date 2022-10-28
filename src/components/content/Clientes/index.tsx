import { AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Cliente } from "../../../tipos/Cliente";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { Paginador } from "../../elementos/Forms/paginador";
import UploadFile from "../../elementos/botones/uploadFile";
import SkeletonCard from "../../Skeletons/skeletonCard";
import NuevoBoton from "../../elementos/botones/nuevoBoton";
import VerCliente from "../../modal/verCliente";
import AddCliente from "../../modal/addCliente";
import { FetchClientes, FetchClientesByQuery } from "../../../utils/fetches/clienteFetches";
import FiltrarInput from "../../elementos/input/filtrarInput";

const arrayNum = [...Array(8)];

const ClientesPage = () => {
  const [Clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [ClientesFiltrados, setClientesFiltrados] = useState<Cliente[] | undefined>();
  const [showModal, setModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const GetAllData = async () => {
      setClientes(
        (await FetchClientes()).filter((c) => {
          return c.nif !== "General";
        })
      );
      setLoading(false);
    };
    GetAllData();
  }, []);

  useEffect(() => {
    if (filtro === "") {
      setClientesFiltrados(undefined);
      return;
    }
  }, [filtro]);

  const Filtrar = async (f: string) => {
    if (f === "") {
      return;
    }

    const clientes = await FetchClientesByQuery(f);
    setClientesFiltrados(clientes.filter((c) => c.nif !== "General"));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full bg-white sm:rounded-bl-3xl sm:rounded-tr-3xl p-4 shadow-lg border-x">
        <div className="flex w-full h-auto py-4 gap-10 justify-end">
          <div className="flex gap-4 w-full h-full">
            <NuevoBoton accionEvent={() => setModal(true)} />
            <div className="hidden sm:inline-block">
              <UploadFile tipoDocumento={TipoDocumento.Clientes} />
            </div>
            {/* <DownloadProductsFile tipoDocumento={TipoDocumento.Clientes} /> */}
          </div>
          <div className="flex w-full gap-2 items-center justify-end">
            <FiltrarInput filtro={filtro} setFiltro={setFiltro} FiltrarCallback={Filtrar} />
          </div>
        </div>
        <div className="flex justify-between border-t border-x rounded-t-2xl px-5 py-2">
          <div className="text-left font-semibold w-1/3">Nombre</div>
          <div className="text-left font-semibold w-1/3">CIF</div>
          <div className="text-left font-semibold w-1/3">Dirección</div>
        </div>
        <TablaClientes clientes={[]} />
        <AnimatePresence>{showModal && <AddCliente showModal={setModal} setClientes={setClientes} />}</AnimatePresence>
      </div>
    );
  }

  if (Clientes.length <= 0) {
    return (
      <div className="flex flex-col h-full w-full bg-white sm:rounded-bl-3xl sm:rounded-tr-3xl p-4 shadow-lg border-x">
        <div className="flex w-full h-auto py-4 gap-10 justify-end">
          <div className="flex gap-4 w-full h-full">
            <div className="hidden sm:inline-block">
              <NuevoBoton accionEvent={() => setModal(true)} />
            </div>
            <UploadFile tipoDocumento={TipoDocumento.Clientes} />
          </div>
          <div className="flex w-full gap-2 items-center justify-end">
            <FiltrarInput filtro={filtro} setFiltro={setFiltro} FiltrarCallback={Filtrar} />
          </div>
        </div>
        <div className="flex justify-between border-t border-x rounded-t-2xl px-5 py-2">
          <div className="text-left font-semibold w-1/3">Nombre</div>
          <div className="text-left font-semibold w-1/3">CIF</div>
          <div className="text-left font-semibold w-1/3">Dirección</div>
        </div>
        <div className="flex justify-center items-center h-full w-full border-2 rounded-b text-xl">
          No hay registros de clientes en la base de datos
        </div>
        <AnimatePresence>{showModal && <AddCliente showModal={setModal} setClientes={setClientes} />}</AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 h-full w-full bg-white sm:rounded-bl-3xl sm:rounded-tr-3xl p-4 shadow-lg">
      <div className="flex w-full h-auto gap-4 justify-end">
        <div className="flex gap-4 w-full h-full">
          <div className="hidden sm:inline-block">
            <NuevoBoton accionEvent={() => setModal(true)} />
          </div>
          <div className="hidden sm:inline-block">
            <UploadFile tipoDocumento={TipoDocumento.Clientes} />
          </div>
        </div>
        <div className="flex w-full gap-2 items-center justify-end">
          <FiltrarInput filtro={filtro} setFiltro={setFiltro} FiltrarCallback={Filtrar} />
        </div>
      </div>
      {ClientesFiltrados ? <TablaClientes clientes={ClientesFiltrados} /> : <TablaClientes clientes={Clientes} />}
      <AnimatePresence>{showModal && <AddCliente showModal={setModal} setClientes={setClientes} />}</AnimatePresence>
    </div>
  );
};

const TablaClientes = (props: { clientes: Cliente[] }) => {
  const [Clientes, setClientes] = useState(props.clientes);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setClientes(props.clientes);
  }, [props.clientes]);

  const elementsPerPage = 50;
  const numPages = Math.ceil(Clientes.length / elementsPerPage);

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
    <>
      <div className="flex flex-col w-full h-full border-t border-x rounded-t-2xl">
        <div className="flex justify-between px-5 py-2">
          <div className="text-left font-semibold w-full sm:w-1/3">Nombre</div>
          <div className="text-right sm:text-left font-semibold w-full sm:w-1/3">CIF</div>
          <div className="hidden sm:block text-right font-semibold w-full sm:w-1/3">Dirección</div>
        </div>
        <div className="flex flex-col grow h-10 w-full border overflow-y-scroll">
          {Clientes.length <= 0
            ? arrayNum.map((n, i) => {
                return <SkeletonCard key={`SkeletonProdList-${i}`} />;
              })
            : Clientes.slice(elementsPerPage * (currentPage - 1), currentPage * elementsPerPage).map((c: Cliente) => {
                return (
                  <div key={`FilaProdTable${c._id}`}>
                    <FilaCliente cliente={c} setClientes={setClientes} />
                  </div>
                );
              })}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Paginador numPages={numPages} paginaActual={currentPage} maxPages={10} cambiarPaginaActual={setPaginaActual} />
      </div>
    </>
  );
};

const FilaCliente = (props: { cliente: Cliente; setClientes: Dispatch<SetStateAction<Cliente[]>> }) => {
  const [showModal, setModal] = useState<boolean>(false);
  const [cliente, setCliente] = useState<Cliente>(props.cliente);

  return (
    <div className="hover:bg-gray-200">
      <div
        className="flex justify-between border-b px-5 py-2 cursor-pointer"
        onClick={() => {
          setModal(true);
        }}
      >
        <div className="w-full sm:w-1/3 text-left">{cliente.nombre}</div>
        <div className="w-full sm:w-1/3 text-right sm:text-left">{cliente.nif}</div>
        <div className="hidden sm:block w-full sm:w-1/3 text-right">{cliente.calle}</div>
      </div>
      <AnimatePresence>
        {showModal && (
          <VerCliente showModal={setModal} cliente={cliente} setCliente={setCliente} setClientes={props.setClientes} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientesPage;
