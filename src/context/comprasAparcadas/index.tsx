import React, { useContext, createContext } from 'react';
import { ProductoVendido } from '../../tipos/ProductoVendido';

type ComprasAparcadas = {
    ComprasAparcadasMap: Map<string, ProductoVendido[]>,
    SetComprasAparcadasMap: React.Dispatch<React.SetStateAction<Map<string, ProductoVendido[]>>>
}

const AppContext = createContext<ComprasAparcadas>({} as ComprasAparcadas);
export const ComprasAparcadasContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [comprasAparcadas, setComprasAparcadas] = React.useState<Map<string, ProductoVendido[]>>(new Map())

    const values: ComprasAparcadas = {
        ComprasAparcadasMap: comprasAparcadas,
        SetComprasAparcadasMap: setComprasAparcadas,
    }


    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useComprasAparcadasContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando el comprasAparcadas Context!!!');
    }

    return context;
}

export default useComprasAparcadasContext;