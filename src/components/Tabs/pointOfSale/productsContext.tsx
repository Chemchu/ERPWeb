import { PropsWithChildren, ReactElement } from 'react';
import { useState, createContext, useContext, useEffect } from 'react'
import { Producto } from '../../../tipos/DBProduct';
import { OpModificacionProducto } from '../../../tipos/Enums/OpModificaciones';
import { SelectedProduct } from '../../../tipos/SelectedProduct';

const ProductsContext = createContext<[Producto[], Function]>({} as [Producto[], Function]);
const SelectedProductsContext = createContext<[SelectedProduct[], Function]>({} as [SelectedProduct[], Function]);
const PriceContext = createContext<[number, Function]>({} as [number, Function]);
const ConstumerMoneyContext = createContext<[string, Function]>({} as [string, Function]);


// Todos los productos de la db
export const useDBProducts = () => {
    return useContext(ProductsContext);
}

// Todos los productos de la db
export const useSelectedProducts = () => {
    return useContext(SelectedProductsContext);
}

// El precio total de la compra (todo lo que hay en el carrito)
export const usePrice = () => {
    return useContext(PriceContext);
}

// El dinero que ha dado el cliente al cajero
export const useConsumerMoney = () => {
    return useContext(ConstumerMoneyContext);
}

export const POSProvider = (props: PropsWithChildren<ReactElement>) => {
    const [allProductos, setDBProductos] = useState<Producto[]>([{} as Producto]);
    const [productos, setProductos] = useState<SelectedProduct[]>([]);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [dineroEntregado, setDineroEntregado] = useState<string>("0");

    useEffect(() => {
        if (productos.length <= 0) setDineroEntregado("0");

        let precio = 0;
        productos.forEach(prodActual => {
            precio += (Number(prodActual.cantidad) * prodActual.precioVenta * (isNaN(prodActual.dto) ? 1 : 1 - (prodActual.dto / 100)));
        });

        setPrecioTotal(Number(precio.toFixed(2)));
    }, [productos]);

    const SetProductosSeleccionados = (productRawObject: SelectedProduct) => {
        try {
            // En caso de recibir un objeto nulo, vacía la lista
            if (!productRawObject) { setProductos([] as SelectedProduct[]); return; }

            // En caso de que se escriba un 0, se elimina dicho producto del carrito
            if (productRawObject.cantidad == "0") { setProductos(productos.filter(p => p._id != productRawObject._id)); return; }

            // Fija el descuento inicial o erroneo a 0
            if (productRawObject.dto < 0 || isNaN(productRawObject.dto)) productRawObject.dto = 0;

            // Si la cantidad no es un entero y no es vacío, no hace nada (en el input de cantidad solo puede hacer entero o "")
            if (!Number.isInteger(Number(productRawObject.cantidad)) && productRawObject.cantidad != "") { return; }

            let prodsRepes = productos.filter(p => p._id == productRawObject._id);

            let prodToAdd = productos.filter(p => p._id == productRawObject._id)[0];
            if (!prodToAdd) prodToAdd = productRawObject;

            switch (productRawObject.operacionMod) {
                case OpModificacionProducto.Suma:
                    if (!Number.isInteger(Number(productRawObject.cantidad))) {
                        prodToAdd.cantidad = "1";
                    }
                    else {
                        prodToAdd.cantidad = (Number(prodToAdd.cantidad) + 1).toString();
                    }
                    break;

                case OpModificacionProducto.Resta:
                    if (!Number.isInteger(Number(productRawObject.cantidad))) {
                        prodToAdd.cantidad = "0";
                    }
                    else {
                        prodToAdd.cantidad = (Number(prodToAdd.cantidad) - 1).toString();
                    }
                    break;

                case OpModificacionProducto.Escritura:
                    prodToAdd.cantidad = !Number.isInteger(Number(productRawObject.cantidad)) ? "" : productRawObject.cantidad;
                    break;

                case OpModificacionProducto.Añadir:
                    if (prodsRepes.length > 0) {
                        prodToAdd.cantidad = (Number(prodToAdd.cantidad) + 1).toString();
                    }
                    else {
                        productos.push(productRawObject);
                    }
                    break;

                case OpModificacionProducto.Descuento:
                    if (prodsRepes.length > 0) {
                        prodToAdd.dto = productRawObject.dto >= 0 && productRawObject.dto <= 100 ? productRawObject.dto : prodToAdd.dto;
                    }
                    break;

                default:
                    console.log(productRawObject.operacionMod);
                    console.log("Default en switch, no debería de ir por aquí");

            }

            //Pone el objeto en la fila que correcta, sin desbaratar el carrito
            if (prodToAdd.cantidad == "0") {
                setProductos(productos.filter(p => p._id != productRawObject._id));
            }
            else {
                const index = productos.findIndex(p => p._id == productRawObject._id);
                productos[index] = prodToAdd;
                setProductos([...productos]);
            }
        } catch (err) {
            setProductos(productos.filter(p => p._id != productRawObject._id));
        }
    }

    const SetAllProducts = (dbProductos: Producto[]) => {
        setDBProductos(dbProductos);
    }

    const SetPrecioCompra = (precio: number) => {
        if (isNaN(precio)) precio = 0;
        setPrecioTotal(precio);
    }

    const SetDineroCliente = (dineroDelCliente: string) => {
        if (!dineroDelCliente.match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$") && dineroDelCliente != "") return;
        setDineroEntregado(dineroDelCliente);
    }

    return (
        <div>
            <ProductsContext.Provider value={[allProductos, SetAllProducts]}>
                <SelectedProductsContext.Provider value={[productos, SetProductosSeleccionados]}>
                    <PriceContext.Provider value={[precioTotal, SetPrecioCompra]}>
                        <ConstumerMoneyContext.Provider value={[dineroEntregado, SetDineroCliente]}>
                            {props.children}
                        </ConstumerMoneyContext.Provider>
                    </PriceContext.Provider>
                </SelectedProductsContext.Provider>
            </ProductsContext.Provider>
        </div>
    )
}
