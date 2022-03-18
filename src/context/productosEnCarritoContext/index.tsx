import React, { useContext, createContext } from 'react';
import { ProductoVendido } from '../../tipos/ProductoVendido';
import { CreateProductoVendidoList } from '../../utils/typeCreator';

type ProductContextualizado = {
    ProductosEnCarrito: ProductoVendido[],
    SetProductosEnCarrito: React.Dispatch<React.SetStateAction<ProductoVendido[]>>,
}

//Context
const AppContext = createContext<ProductContextualizado>({} as ProductContextualizado);

//Provider
export const ProductCarritoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [Productos, setProductos] = React.useState<ProductoVendido[]>([]);

    const SetValidatedSoldProductos = (prodList: ProductoVendido[]) => {
        const pL = CreateProductoVendidoList(prodList);
        setProductos(pL);
    }

    const values: ProductContextualizado = {
        ProductosEnCarrito: Productos,
        SetProductosEnCarrito: setProductos,
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