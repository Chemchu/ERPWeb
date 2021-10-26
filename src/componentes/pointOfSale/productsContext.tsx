import { PropsWithChildren, ReactElement } from 'react';
import { useState, createContext, useContext, useEffect } from 'react'
import { DBProduct } from '../../tipos/DBProduct';
import { SelectedProduct } from '../../tipos/SelectedProduct';

const ProductsContext = createContext<[DBProduct[], Function]>({} as [DBProduct[], Function]);
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


export const POSProvider= (props: PropsWithChildren<ReactElement>) => {
    const [allProductos, setDBProductos] = useState<DBProduct[]>([{} as DBProduct]);    
    const [productos, setProductos] = useState<SelectedProduct[]>([]);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [dineroEntregado, setDineroEntregado] = useState<string>("0");

    useEffect(() => {
        if(productos.length <= 0) setDineroEntregado("0");        

        let precioTotal = 0;
        productos.forEach(prodActual => {
            precioTotal += (parseInt(prodActual.cantidad) * prodActual.precioVenta * (isNaN(prodActual.dto) ? 1 : 1 - (prodActual.dto/100)) ); 
        });

        setPrecioTotal(parseFloat(precioTotal.toFixed(2)));
    },[productos]);

    const SetProductosSeleccionados = (productRawObject: SelectedProduct) => {
        try
        {
            if(!productRawObject) { setProductos([] as SelectedProduct[]); return;}

            if(productRawObject.dto < 0 || isNaN(productRawObject.dto)) productRawObject.dto = 0;
            
            // Comprueba si está recibiendo un objeto vacío, en tal caso borra todo
            let prodsRepes = productos.filter(p => p._id == productRawObject._id);
            var finalList = productos.filter(p => p._id != productRawObject._id);

            // Elimina un producto de la lista de productos en carrito en caso de que su cantidad == 0
            if(prodsRepes && parseInt(productRawObject.cantidad) <= 0) 
            {
                if(prodsRepes[0].cantidad == "1") { setProductos(finalList); return; }
            }

            // En caso de querer añadir un producto que ya está en el carrito
            if(prodsRepes.length > 0) {             
                // Se suma uno o resta uno en función de la cantidad
                const prodCant = productRawObject.operacionMod == 'resta' ? parseInt(prodsRepes[0].cantidad) - 1 : parseInt(prodsRepes[0].cantidad) + 1; 

                // Crea el objeto del producto a añadir
                let prodToAdd: SelectedProduct = productRawObject
                prodToAdd.cantidad = prodCant.toString();
                
                // En caso de que la cantidad se esté cambiando por teclado
                if(productRawObject.valorEscrito) {
                    // Si se escribe 0, elimina dicho producto
                    if(productRawObject.cantidad == "0") { setProductos(finalList);  return; }
                    // En caso de que reciba un NaN, pone un "" en su lugar
                    if(isNaN(parseInt(productRawObject.cantidad))) prodToAdd = {_id: productRawObject._id, cantidad: "", valorEscrito: true, dto: productRawObject.dto} as SelectedProduct;
                    // En caso contrario, el objeto sirve para añadir al carrito
                    else prodToAdd = productRawObject;
                }

                // Pone el objeto en la fila que correcta, sin desbaratar el carrito
                const index = productos.findIndex(p => p._id == productRawObject._id);
                productos[index] = prodToAdd;
                setProductos([...productos]);
            }
            // En caso de que este producto no esté ya en carrito, se añade
            else {
                var prodToList: SelectedProduct = productRawObject;
                prodToList.cantidad = "1";
                productos.push(prodToList);
                setProductos([...productos])
            }
        }catch(err)
        {
            setProductos(productos.filter(p => p._id != productRawObject._id));
        }
    }

    const SetAllProducts = (dbProductos: DBProduct[]) => {
        setDBProductos(dbProductos);
    }

    const SetPrecioCompra = (precio: number) => {
        if(isNaN(precio)) precio = 0;
        setPrecioTotal(precio);
    }

    const SetDineroCliente = (dineroDelCliente: string) => {
        if(!dineroDelCliente.match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")) dineroDelCliente = dineroDelCliente.substring(0, dineroDelCliente.length - 1);
        
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

