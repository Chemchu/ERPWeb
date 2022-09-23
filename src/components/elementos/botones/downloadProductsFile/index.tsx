import useEmpleadoContext from "../../../../context/empleadoContext";
import { Roles } from "../../../../tipos/Enums/Roles";
import * as XLSX from "xlsx";
import { Producto } from "../../../../tipos/Producto";

const DownloadProductsFile = (props: { productos: Producto[] }) => {
    const { Empleado } = useEmpleadoContext();

    const DownloadProducts = async () => {
        const worksheet = XLSX.utils.json_to_sheet(props.productos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");
        XLSX.writeFile(workbook, "Productos.xlsx");
    }

    if (Empleado.rol === Roles.Cajero) {
        return (
            <></>
        )
    }

    return (
        <button onClick={DownloadProducts}>
            <label className="flex flex-shrink-0 justify-center gap-2 w-28 py-2 text-base font-semibold cursor-pointer 
                text-white bg-cyan-500 rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2
                focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-blue-200">
                <span>
                    Exportar
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </label>
        </button>
    );
}

export default DownloadProductsFile;