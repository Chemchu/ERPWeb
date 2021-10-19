import {useState, createContext, useContext} from 'react'

const ProductsContext = createContext();
const SelectedProductsContext = createContext();
const PriceContext = createContext();
const ConstumerMoneyContext = createContext();

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

export const POSProvider = (props) => {
    const [allProductos, setAllProductos] = useState([]);    
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [dineroEntregado, setDineroEntregado] = useState(0);

    const SetAllProducts = (prods) => {
        setAllProductos(prods);
    }

    const SetProductosSeleccionados = (newProductToAdd) => {
        //if(Object.keys(newProductToAdd).length === 0) {setProductosSeleccionados([]); return;}
        
        var prodsRepes = productosSeleccionados.filter(p => p._id == newProductToAdd._id);
        var prodsDiferentes = productosSeleccionados.filter(p => p._id != newProductToAdd._id);

        if(prodsRepes.length > 0) {
            prodsDiferentes.push({_id: newProductToAdd._id, cantidad: prodsRepes.length + 1})
            setProductosSeleccionados([prodsDiferentes]);
        }
        else {
            setProductosSeleccionados([...productosSeleccionados, {_id: newProductToAdd._id, cantidad: 1}])
        }
    }

    const SetPrecioTotal = (precio) => {
        setPrecioTotal(precio);
    }

    const SetDineroEntregado = (dinero) => {
        setDineroEntregado(dinero);
    }

    return (
        <div>
            <ProductsContext.Provider value={[allProductos, SetAllProducts]}>
                <SelectedProductsContext.Provider value={[productosSeleccionados, SetProductosSeleccionados]}>
                    <PriceContext.Provider value={[precioTotal, SetPrecioTotal]}>
                        <ConstumerMoneyContext.Provider value={[dineroEntregado, SetDineroEntregado]}>
                            {props.children}
                        </ConstumerMoneyContext.Provider>
                    </PriceContext.Provider>
                </SelectedProductsContext.Provider>
            </ProductsContext.Provider>
        </div>        
    )
}


