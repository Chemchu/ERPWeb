import React, { useContext, createContext } from 'react';
import { Cliente } from '../../tipos/Cliente';
import NodeProps from '../../tipos/NodeProps';

type ClienteContextualizado = {
    Clientes: Cliente[],
    SetClientes: React.Dispatch<React.SetStateAction<Cliente[]>>,
    StateIdentifierClientes: string,
    SetStateIdentifierClientes: React.Dispatch<React.SetStateAction<string>>
}

//Context
const AppContext = createContext<ClienteContextualizado>({} as ClienteContextualizado);

//Provider
const AppContextProvider = ({ children }: NodeProps) => {
    const [allClientes, setAllClientes] = React.useState<Cliente[]>([]);
    const [state, setStateID] = React.useState<string>("");

    const values: ClienteContextualizado = {
        Clientes: allClientes,
        SetClientes: setAllClientes,
        StateIdentifierClientes: state,
        SetStateIdentifierClientes: setStateID
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