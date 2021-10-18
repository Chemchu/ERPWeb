import {useState, createContext, useContext} from 'react'

const ProductsContext = createContext();
const PriceContext = createContext();
const ConstumerMoneyContext = createContext();

// Todos los productos de la db
export const useDBProducts = () => {
    return useContext(ProductsContext);
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
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [precioTotal, setPrecioTotal] = useState(0);
    const [dineroEntregado, setDineroEntregado] = useState(0);

    return (
        <div>
            <ProductsContext.Provider value={[productos, setProductos]}>
                <PriceContext.Provider value={[precioTotal, setPrecioTotal]}>
                    <ConstumerMoneyContext.Provider value={[dineroEntregado, setDineroEntregado]}>
                        {props.children}
                    </ConstumerMoneyContext.Provider>
                </PriceContext.Provider>
            </ProductsContext.Provider>
        </div>        
    )
}


