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

    const SetProductosSeleccionados = (productRawObject) => {
        if(Object.keys(productRawObject).length === 0) {setProductosSeleccionados([]); return;}

        let prodsRepes = productosSeleccionados.filter(p => p._id == productRawObject._id);
        
        if(prodsRepes && productRawObject.cantidad <= 0) 
        {
            if(prodsRepes[0].cantidad == 1) {setProductosSeleccionados(productosSeleccionados.filter(p => p._id != productRawObject._id)); return;}
        }

        if(prodsRepes.length > 0) {              
            const prodCant = productRawObject.cantidad < 0 ? parseInt(prodsRepes[0].cantidad - 1) : parseInt(prodsRepes[0].cantidad + 1); 
            const prodToAdd = {_id: productRawObject._id, cantidad: prodCant};

            const index = productosSeleccionados.findIndex(p => p._id == productRawObject._id);
            productosSeleccionados[index] = prodToAdd;
            setProductosSeleccionados([...productosSeleccionados]);
        }
        else {
            productosSeleccionados.push({_id: productRawObject._id, cantidad: parseInt(1)});
            setProductosSeleccionados([...productosSeleccionados])
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


