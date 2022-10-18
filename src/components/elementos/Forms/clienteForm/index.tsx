import { useEffect, useState } from "react";
import { Cliente } from "../../../../tipos/Cliente";

const ClienteForm = (props: { cliente?: Cliente, setCliente: Function, setHayCambios?: Function }) => {
    const [Calle, setCalle] = useState<string>(props.cliente?.calle || "");
    const [CP, setCP] = useState<string>(props.cliente?.cp || "");
    const [Cif, setNif] = useState<string>(props.cliente?.nif || "");

    useEffect(() => {
        const p: Cliente = {
            _id: "Creando",
            nombre: "Creando",
            calle: Calle,
            cp: CP,
            nif: Cif
        }
        props.setCliente(p);

    }, [Calle, CP, Cif]);

    return (
        <form className="flex gap-10 w-full pt-10">
            <div className="flex flex-col gap-4 w-1/2 h-full ">
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Calle
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Dirección postal"
                        value={Calle} onChange={(e) => { setCalle(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                </div>
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        CIF
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Código de identificación fiscal"
                        value={Cif} onChange={(e) => { setNif(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                </div>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        Código postal
                    </label>
                    <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Código postal"
                        value={CP} onChange={(e) => { setCP(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                </div>
            </div>
        </form>

    )
}

export default ClienteForm;