import { useEffect } from "react";
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

            await fetch(`/api/${props.tipoDocumento}/${f.name}`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(text)
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    // const handleClick = () => {
    //     console.log(hiddenFileInput);
    //     hiddenFileInput.current?.click();
    // };

    return (
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white hover:bg-blue-400 text-black hover:text-white hover:fill-white text-blue rounded-lg shadow-lg border border-blue cursor-pointer hover:bg-blue">
            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Añadir productos</span>
            <input type='file' className="hidden" accept=".csv, .xlsx, .xls" onChange={handleChange} />
        </label>
    );
}

export default UploadFile;