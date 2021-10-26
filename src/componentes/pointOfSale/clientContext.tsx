import React, {createContext, PropsWithChildren, ReactElement, useContext, useState} from 'react'
import { Client } from '../../tipos/Client';

const ClientContext = createContext<[Client[], Function]>({} as [Client[], Function]);
const CurrentClientContext = createContext<[Client, Function]>({} as [Client, Function]);

export const useDBClients = () => {
    return useContext(ClientContext);
}

export const useCurrentClient = () => {
    return useContext(CurrentClientContext);
}

function ClientProvider(props: PropsWithChildren<ReactElement>) {    
    const [clientes, setClientes] = useState<Client[]>([] as Client[]);
    const [clienteSeleccionado, setCliente] = useState<Client>({} as Client);

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
