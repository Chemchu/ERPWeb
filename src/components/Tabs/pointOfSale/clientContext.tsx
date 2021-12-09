import { createContext, PropsWithChildren, ReactElement, useContext, useState } from 'react'
import { Cliente } from '../../../tipos/Cliente';

const ClientContext = createContext<[Cliente[], Function]>({} as [Cliente[], Function]);
const CurrentClientContext = createContext<[Cliente, Function]>({} as [Cliente, Function]);

export const useDBClients = () => {
    return useContext(ClientContext);
}

export const useCurrentClient = () => {
    return useContext(CurrentClientContext);
}

function ClientProvider(props: PropsWithChildren<ReactElement>) {
    const [clientes, setClientes] = useState<Cliente[]>([] as Cliente[]);
    const [clienteSeleccionado, setCliente] = useState<Cliente>({} as Cliente);

    return (
        <div>
            <ClientContext.Provider value={[clientes, setClientes]}>
                <CurrentClientContext.Provider value={[clienteSeleccionado, setCliente]}>
                    {props.children}
                </CurrentClientContext.Provider>
            </ClientContext.Provider>
        </div>
    )
}

export default ClientProvider
