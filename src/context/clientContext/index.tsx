import React, { useContext, createContext } from 'react';
import { Cliente } from '../../tipos/Cliente';

type ClienteContextualizado = {
    Clientes: Cliente[],
    SetClientes: React.Dispatch<React.SetStateAction<Cliente[]>>,
    ClientesState: string,
    SetClientesState: React.Dispatch<React.SetStateAction<string>>
}

//Context
const AppContext = createContext<ClienteContextualizado>({} as ClienteContextualizado);

//Provider
export const ClienteContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [Clientes, setClientes] = React.useState<Cliente[]>([]);
    const [ClientesState, setClientesState] = React.useState<string>("");

    const values: ClienteContextualizado = {
        Clientes: Clientes,
        SetClientes: setClientes,
        ClientesState: ClientesState,
        SetClientesState: setClientesState
    }

    // Interface donde será expuesto como proveedor y envolverá la App.
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useClientContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando el Cliente Context!!!');
    }

    return context;
}

export default useClientContext;