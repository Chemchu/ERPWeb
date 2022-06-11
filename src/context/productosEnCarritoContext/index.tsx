import React, { useContext, createContext } from 'react';
import { ProductoVendido } from '../../tipos/ProductoVendido';

type ProductContextualizado = {
    ProductosEnCarrito: ProductoVendido[],
    SetProductosEnCarrito: React.Dispatch<React.SetStateAction<ProductoVendido[]>>,
    DtoEfectivo: string,
    SetDtoEfectivo: React.Dispatch<React.SetStateAction<string>>,
    DtoPorcentaje: string,
    SetDtoPorcentaje: React.Dispatch<React.SetStateAction<string>>
}

//Context
const AppContext = createContext<ProductContextualizado>({} as ProductContextualizado);

//Provider
export const ProductCarritoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [Productos, setProductos] = React.useState<ProductoVendido[]>([]);
    const [DtoEfectivo, setDtoEfectivo] = React.useState<string>("0");
    const [DtoPorcentaje, setDtoPorcentaje] = React.useState<string>("0");

    const values: ProductContextualizado = {
        ProductosEnCarrito: Productos,
        SetProductosEnCarrito: setProductos,
        DtoEfectivo: DtoEfectivo,
        SetDtoEfectivo: setDtoEfectivo,
        DtoPorcentaje: DtoPorcentaje,
        SetDtoPorcentaje: setDtoPorcentaje
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