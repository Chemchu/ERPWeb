import React, { useContext, createContext } from 'react';
import { POSState } from '../../tipos/POSState';

const AppContext = createContext<POSState>({} as POSState);
export const TPVStateContextProvider = (props: {
    isEmpleadoUsingTPV: boolean, setEmpleadoUsingTPV: React.Dispatch<React.SetStateAction<boolean>>,
    State: POSState, children: React.ReactNode
}) => {
    const values: POSState = props.State

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    );
}

export function useTpvContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando el contexto del punto de venta');
    }

    return context;
}

export default useTpvContext;