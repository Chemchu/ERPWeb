import React, { useContext, createContext } from 'react';
import { ProductoVendido } from '../../tipos/ProductoVendido';

type ProductContextualizado = {
    ProductosEnCarrito: ProductoVendido[],
    SetProductosEnCarrito: React.Dispatch<React.SetStateAction<ProductoVendido[]>>,
}

//Context
const AppContext = createContext<ProductContextualizado>({} as ProductContextualizado);

//Provider
export const ProductCarritoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [allProductos, setAllProductos] = React.useState<ProductoVendido[]>([]);

    const values: ProductContextualizado = {
        ProductosEnCarrito: allProductos,
        SetProductosEnCarrito: setAllProductos,
    }

    // Interface donde será expuesto como proveedor y envolverá la App.
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useProductEnCarritoContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando el ProductoEnCarrito Context!!!');
    }

    return context;
}

export default useProductEnCarritoContext;