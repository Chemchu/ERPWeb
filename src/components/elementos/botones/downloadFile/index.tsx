import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import useEmpleadoContext from "../../../../context/empleadoContext";
import { Roles } from "../../../../tipos/Enums/Roles";
import { TipoDocumento } from "../../../../tipos/Enums/TipoDocumentos";
import DownloadCierresModal from "../../../modal/downloadFileModal/downloadCierresModal";
import DownloadVentasModal from "../../../modal/downloadFileModal/downloadVentasModal";

const DownloadFile = (props: { tipoDocumento: TipoDocumento }) => {
    const [showModal, setModal] = useState<boolean>(false);
    const { Empleado } = useEmpleadoContext();

    if (Empleado.rol === Roles.Cajero) {
        return (
            <></>
        )
    }

    const FileType = () => {
        switch (props.tipoDocumento) {
            case TipoDocumento.Cierres:
                return <DownloadCierresModal setModal={setModal} />

            case TipoDocumento.Ventas:
                return <DownloadVentasModal setModal={setModal} />

            default:
                return undefined;
        }
    }

    return (
        <>
            <label className="flex flex-shrink-0 justify-center gap-2 w-28 py-2 text-base font-semibold cursor-pointer text-white bg-cyan-500 rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-blue-200"
                onClick={() => setModal(true)}>
                <span>
                    Exportar
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </label>
            <AnimatePresence>
                {
                    showModal &&
                    FileType()
                }
            </AnimatePresence>
        </>
    );
}

export default DownloadFile;