import React, { useContext, createContext } from 'react';
import { Producto } from '../../tipos/Producto';

type ProductContextualizado = {
    Productos: Producto[],
    SetProductos: React.Dispatch<React.SetStateAction<Producto[]>>,
    ProductState: string,
    SetProductState: React.Dispatch<React.SetStateAction<string>>
}

//Context
const AppContext = createContext<ProductContextualizado>({} as ProductContextualizado);

//Provider
export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [Productos, setAllProductos] = React.useState<Producto[]>([]);
    const [ProductState, setProductState] = React.useState<string>("");

    const values: ProductContextualizado = {
        Productos: Productos,
        SetProductos: setAllProductos,
        ProductState: ProductState,
        SetProductState: setProductState
    }

    // Interface donde será expuesto como proveedor y envolverá la App.
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useProductContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando el Producto Context!!!');
    }

    return context;
}

export default useProductContext;