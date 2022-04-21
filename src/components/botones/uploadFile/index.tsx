import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { notifyError, notifyPromise, notifySuccess } from "../../../utils/toastify";

const UploadFile = (props: { tipoDocumento: TipoDocumento }) => {
    const TIPOS_PERMITIDOS: string[] = ["csv", "xlsx", "xls"];

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            e.preventDefault();
            if (!e.target.files) return;
            if (e.target.files.length <= 0) return;

            const f = e.target.files[0];

            if (!f.type) { console.log("File no tiene tipo"); return; }
            if (!TIPOS_PERMITIDOS.includes(`${f.type.substring(5)}`)) { console.log(`File is not an ${f.type}`); return; }

            const text = await f.text();

            const res = new Promise(async (resolve) => {
                const response = await fetch(`/api/${props.tipoDocumento}/file`, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(text)
                });
                const json = await response.json();
                resolve(json.message)
            });

            notifyPromise(res, "Añadiendo productos...");
        }
        catch (e) {
            console.log(e);
            notifyError("Problemas al subir el documento");
        }
        finally {
            // Esta línea de código asegura que se pueda volver a subir el mismo archivo otra vez
            e.target.value = ''
        }
    };

    return (
        <label className="flex gap-2 px-4 py-2 text-base font-semibold cursor-pointer text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-blue-200">
            Importar
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <input type='file' className="hidden" accept=".csv, .xlsx, .xls" onChange={handleChange} />
        </label>
    );
}

export default UploadFile;