import React, { useContext, createContext } from 'react';
import { POSState } from '../../tipos/POSState';

const AppContext = createContext<POSState>({} as POSState);
export const TPVStateContextProvider = (props: { State: POSState, children: React.ReactNode }) => {
    const values: POSState = props.State

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    );
}

export function useTpvStateContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando el contexto del punto de venta');
    }

    return context;
}

export default useTpvStateContext;