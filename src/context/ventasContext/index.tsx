import React, { useContext, createContext } from 'react';
import { Venta } from '../../tipos/Venta';

type VentasContextualizado = {
    Ventas: Venta[],
    SetVentas: React.Dispatch<React.SetStateAction<Venta[]>>,
    VentasState: string,
    SetVentasState: React.Dispatch<React.SetStateAction<string>>
}

//Context
const AppContext = createContext<VentasContextualizado>({} as VentasContextualizado);

//Provider
export const VentasContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [Ventas, setAllVentas] = React.useState<Venta[]>([]);
    const [VentaState, setVentaState] = React.useState<string>("");

    const values: VentasContextualizado = {
        Ventas: Ventas,
        SetVentas: setAllVentas,
        VentasState: VentaState,
        SetVentasState: setVentaState
    }

    // Interface donde será expuesto como proveedor y envolverá la App.
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useVentaContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando el Venta Context!!!');
    }

    return context;
}

export default useVentaContext;