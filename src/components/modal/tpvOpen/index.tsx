import { gql, useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import { parseJwt } from "../../../utils/parseJwt";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
import Dropdown from "../../Forms/dropdown";
import { Backdrop } from "../backdrop";

const TpvOpenModal = () => {
    const OCUPY_TPV = gql`
        mutation OcupyTPV($idEmpleado: ID!, $idTpv: ID!) {
            ocupyTPV(idEmpleado: $idEmpleado, idTPV: $idTpv) {
                token
            }
        }
    `;
    const [tpvs, setTpvs] = useState<Map<string, string>>(new Map());
    const [currentTpv, setCurrentTpv] = useState<string>();
    const [cajaInicial, setCajaInicial] = useState<string>('0');
    const [ocuparTpv, { data, error }] = useMutation(OCUPY_TPV);

    useEffect(() => {
        const TpvsAbiertas = async () => {
            const res = await fetch(`/api/tpv`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET'
            });

            const Response = await res.json();

            if (Response.tpvs) {
                // Transforma el string en TPV Map<string, string> 
                setTpvs(new Map(JSON.parse(Response.tpvs)));
                return;
            }
        }
        TpvsAbiertas();
    }, []);

    useEffect(() => {
        // Selecciona el primer TPV libre
        setCurrentTpv(tpvs.values().next().value)
    }, [tpvs]);

    const AbrirTPV = async () => {
        const auth = Cookies.get("authorization");
        if (!auth) { return; }

        const payload = parseJwt(auth);

        ocuparTpv({
            variables: {
                "idEmpleado": payload._id,
                "idTpv": payload.TPV
            }
        });

    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop >
                <div className="flex flex-col h-3/5 w-3/5 bg-white rounded-xl  items-center">
                    <div className="text-2xl justify-self-start pt-4 w">
                        TPV Cerrada
                    </div>

                    <div className="flex flex-col flex-grow gap-10 justify-center">
                        <div className="flex gap-10">
                            <div className="self-center ">
                                Selecciona la TPV
                            </div>
                            <div className="self-center justify-end">
                                <Dropdown selectedElemento={tpvs ? tpvs.values().next().value : "Cargando..."} elementos={Array.from(tpvs.values())} setElemento={setCurrentTpv} />
                            </div>
                        </div>

                        <div className="flex gap-10">
                            <div className="self-center">
                                Caja inicial
                            </div>
                            <div className="flex gap-2 self-center justify-end ml-auto">
                                <input type="text" inputMode="numeric" name="cajaInicial" id="cajaInicial" placeholder=" Por ejemplo 350.50"
                                    className="text-right border border-gray-500 rounded-md justify-self-end w-60 appearance-none outline-blue-500"
                                    onChange={(e) => { setCajaInicial(ValidatePositiveFloatingNumber(e.target.value)) }} value={cajaInicial} />
                                €

                            </div>
                        </div>
                    </div>



                    <div className="flex flex-row-reverse gap-10 text-center justify-end items-end text-white pb-4">
                        {
                            Number(cajaInicial) > 0 && currentTpv && tpvs ?
                                <div className="flex h-10 w-32 m-auto bg-blue-500 hover:bg-blue-600 rounded-2xl cursor-pointer items-center justify-center shadow-lg"
                                    onClick={AbrirTPV}>
                                    <div>
                                        Abrir TPV
                                    </div>
                                </div>
                                :
                                <div className="flex h-10 w-32 m-auto bg-blue-400 rounded-2xl cursor-default items-center justify-center shadow-lg">
                                    <div>
                                        Abrir TPV
                                    </div>
                                </div>
                        }
                        <div className="flex h-10 w-32 m-auto bg-red-500 hover:bg-red-600 rounded-2xl cursor-pointer items-center justify-center shadow-lg"
                            onClick={() => { Router.push('/dashboard/') }}>
                            <div>
                                Cancelar
                            </div>
                        </div>
                    </div>
                </div>
            </Backdrop>
        </motion.div>
    );
}

export default TpvOpenModal;