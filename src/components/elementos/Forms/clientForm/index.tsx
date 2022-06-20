import { useEffect, useMemo, useState } from "react";
import { Cliente } from "../../../../tipos/Cliente";

const ClientForm = (props: { setCliente: Function, cliente?: Cliente, setHayCambios?: Function }) => {
    const [Nombre, setNombre] = useState<string>(props.cliente?.nombre || "");
    const [Calle, setCalle] = useState<string>(props.cliente?.calle || "");
    const [CP, setCP] = useState<string>(props.cliente?.cp || "");
    const [CIF, setCif] = useState<string>(props.cliente?.nif || "");

    const cliente: Cliente = useMemo(() => {
        return {
            _id: "Creando",
            nombre: Nombre,
            calle: Calle,
            cp: CP,
            nif: CIF
        }
    }, [Nombre, CP, Calle, CIF]);

    useEffect(() => {
        props.setCliente(cliente);
    }, [cliente]);

    return (
        <form className="flex flex-col gap-4 w-full pt-10">
            {
                props.cliente &&
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        ID
                    </label>
                    <input disabled className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text"
                        value={props.cliente._id} />
                </div>
            }
            <div className="flex gap-10 w-full ">
                <div className="flex flex-col gap-4 w-1/2 h-full ">
                    <div>
                        <label className="block tracking-wide text-gray-700 font-bold">
                            Nombre
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ring-blue-500" type="text" placeholder="Por ejemplo `John Doe`"
                            value={Nombre} onChange={(e) => { setNombre(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                    </div>
                    <div className="w-full">
                        <label className="block tracking-wide text-gray-700 font-bold">
                            Dirección
                        </label>
                        <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Su dirección física"
                            value={Calle} onChange={(e) => { setCalle(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                    <div className="w-full">
                        <label className="block tracking-wide text-gray-700 font-bold">
                            Documento de identidad
                        </label>
                        <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text"
                            placeholder="DNI, NIE o CIF"
                            value={CIF} onChange={(e) => { setCif(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                    </div>
                    <div className="w-full">
                        <label className="block tracking-wide text-gray-700 font-bold">
                            Código postal
                        </label>
                        <input className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"
                            placeholder="Número código postal"
                            value={CP} onChange={(e) => { setCP(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                    </div>
                </div>
            </div>
        </form>

    )
}

export default ClientForm;