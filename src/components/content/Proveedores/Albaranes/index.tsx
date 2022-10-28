import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Roles } from "../../../../tipos/Enums/Roles";
import { notifyWarn } from "../../../../utils/toastify";
import { ValidateSearchString } from "../../../../utils/validator";
import AuthorizationWrapper from "../../../authorizationWrapper";
import NuevoBoton from "../../../elementos/botones/nuevoBoton";
import { Paginador } from "../../../elementos/Forms/paginador";
import FiltrarInput from "../../../elementos/input/filtrarInput";
import SkeletonCard from "../../../Skeletons/skeletonCard";

const AlbaranesPage = () => {
  const [filtro, setFiltro] = useState<string>("");
  const [albaranes, setAlbaranes] = useState<any[]>([]);
  useEffect(() => {}, []);

  const Filtrar = async () => {
    if (filtro === "") {
      return;
    }
    if (!ValidateSearchString(filtro)) {
      notifyWarn("Albarán inválido");
      return;
    }

    // setProductosFiltradas(await FetchProductoByQuery(f, tipoProductos));
  };

  return (
    <main className="flex flex-col gap-4 w-full h-full max-h-full bg-white border-x border-b sm:rounded-bl-3xl sm:rounded-tr-3xl shadow-lg p-4">
      <section className="flex sm:justify-between justify-end items-start w-full">
        <div className="hidden sm:block">
          <NuevoBoton accionEvent={() => {}} />
        </div>
        <div className="flex w-full gap-2 items-center justify-end">
          <FiltrarInput filtro={filtro} setFiltro={setFiltro} FiltrarCallback={Filtrar} />
        </div>
      </section>
      <AlbaranTable isLoading={false} setAlbaran={() => {}} albaranes={[]} />
    </main>
  );
};

const arrayNum = [...Array(8)];

const AlbaranTable = (props: { isLoading: boolean; albaranes: any[]; setAlbaran: Function }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const elementsPerPage = 50;
  const numPages = Math.ceil(props.albaranes.length / elementsPerPage);

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
      <div className="flex justify-between border-t-2 border-x-2 rounded-t-2xl px-5 py-2">
        <div className="text-left font-semibold">Nombre</div>
        <div className="text-left font-semibold">Localidad</div>
        <div className="text-left font-semibold ">Teléfono</div>
        <div className="text-right font-semibold">Correo electrónico</div>
      </div>
      {props.isLoading ? (
        <div className="h-full w-full border-2 rounded-b overflow-y-scroll">
          {arrayNum.map((n, i) => {
            return <SkeletonCard key={`SkeletonProdList-${i}`} />;
          })}
        </div>
      ) : (
        <>
          <div className="h-full w-full border-2 rounded-b overflow-y-scroll">
            {props.albaranes.length <= 0 ? (
              <div className="flex justify-center items-center h-full w-full text-xl p-2">
                No se ha encontrado registros de albaranes en el sistema (todavía en desarrollo)
              </div>
            ) : (
              props.albaranes
                .slice(elementsPerPage * (currentPage - 1), currentPage * elementsPerPage)
                .map((p, index) => {
                  return (
                    <div key={`FilaProdTable${p._id}`}>
                      {/* <FilaProducto producto={p} productos={props.Productos} setAllProductos={props.SetProductos} /> */}
                      proveedor or smh
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

const FilaAlbaran = (props: { albaran: any; albaranes: any[]; setAllAlbaranes: Function }) => {
  const [showModal, setModal] = useState<boolean>(false);
  const [albaran, setAlbaran] = useState<any>(props.albaran);

  const SetCurrentAlbaran = (p: any | null) => {
    if (p === null) {
      const provs = props.albaranes.filter((p) => {
        return p._id !== albaran._id;
      });
      props.setAllAlbaranes(provs);

      return;
    }

    setAlbaran(p);
  };

  return (
    <div className="hover:bg-blue-200">
      <div
        className="flex justify-between border-b px-5 py-2 cursor-pointer"
        onClick={() => {
          setModal(true);
        }}
      >
        <div className="text-left truncate">{albaran.nombre}</div>
        <div className="text-left">{albaran.localidad}</div>
        <div className="text-left truncate">{albaran.telefono}</div>
        <div className="text-right">{albaran.email}</div>
      </div>
      <AnimatePresence>
        {/* {showModal && <VerProducto showModal={setModal} producto={proeveedor} setProducto={SetCurrentProveedor} />} */}
      </AnimatePresence>
    </div>
  );
};

export default AuthorizationWrapper([Roles.Administrador, Roles.Gerente], true)(AlbaranesPage);
