import {useState, createContext, useContext, useEffect} from 'react'

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
    const [productos, setProductos] = useState([]);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [dineroEntregado, setDineroEntregado] = useState(0);

    useEffect(() => {
        var precioTotal = productos.reduce((total, prodActual) => {
            console.log(prodActual)
            return total + ((prodActual.cantidad * allProductos.find(p => p._id == prodActual._id).precioVenta) * parseFloat(isNaN(prodActual.dto) ? 1 : 1 - (prodActual.dto/100))); 
        }, 0);
        setPrecioTotal(parseFloat(precioTotal).toFixed(2));
    },[productos]);

    const SetAllProducts = (productos) => {
        setAllProductos(productos);
    }

    const SetProductosSeleccionados = (productRawObject) => {
        try
        {
            if(!productRawObject) { setProductos([]); return;}

            if(productRawObject.dto < 0 || isNaN(productRawObject.dto)) productRawObject.dto = 0;
            
            // Comprueba si está recibiendo un objeto vacío, en tal caso borra todo
            let prodsRepes = productos.filter(p => p._id == productRawObject._id);
            var finalList = productos.filter(p => p._id != productRawObject._id);

            // Elimina un producto de la lista de productos en carrito en caso de que su cantidad == 0
            if(prodsRepes && productRawObject.cantidad <= 0) 
            {
                if(prodsRepes[0].cantidad == 1) { setProductos(finalList); return; }
            }

            // En caso de querer añadir un producto que ya está en el carrito
            if(prodsRepes.length > 0) {             
                // Se suma uno o resta uno en función de la cantidad
                const prodCant = productRawObject.cantidad < 0 ? parseInt(prodsRepes[0].cantidad - 1) : parseInt(prodsRepes[0].cantidad + 1); 

                // Crea el objeto del producto a añadir
                let prodToAdd = {_id: productRawObject._id, cantidad: prodCant, dto: productRawObject.dto};
                
                // En caso de que la cantidad se esté cambiando por teclado
                if(productRawObject.valorEscrito) {
                    // Si se escribe 0, elimina dicho producto
                    if(productRawObject.cantidad == 0) { setProductos(finalList);  return; }
                    // En caso de que reciba un NaN, pone un "" en su lugar
                    if(isNaN(productRawObject.cantidad)) prodToAdd = {_id: productRawObject._id, cantidad: "", valorEscrito: true, dto: productRawObject.dto};
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
                var prodToList = {_id: productRawObject._id, cantidad: parseInt(1), dto: productRawObject.dto};
                productos.push(prodToList);
                setProductos([...productos])
            }
        }catch(err)
        {
            console.log(err);
            setProductos(productos.filter(p => p._id != productRawObject._id));
        }
    }

    const SetDineroEntregado = (dinero) => {
        setDineroEntregado(dinero);
    }

    return (
        <div>
            <ProductsContext.Provider value={[allProductos, SetAllProducts]}>
                <SelectedProductsContext.Provider value={[productos, SetProductosSeleccionados]}>
                    <PriceContext.Provider value={[precioTotal, setPrecioTotal]}>
                        <ConstumerMoneyContext.Provider value={[dineroEntregado, SetDineroEntregado]}>
                            {props.children}
                        </ConstumerMoneyContext.Provider>
                    </PriceContext.Provider>
                </SelectedProductsContext.Provider>
            </ProductsContext.Provider>
        </div>        
    )
}

