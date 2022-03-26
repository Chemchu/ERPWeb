import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";

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

            await fetch(`/api/${props.tipoDocumento}/file`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(text)
            })

        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <label className="flex gap-2 px-4 py-2 text-base font-semibold cursor-pointer text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-blue-200">
            Importar
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <input type='file' className="hidden" accept=".csv, .xlsx, .xls" onChange={handleChange} />
        </label>
    );
}

export default UploadFile;