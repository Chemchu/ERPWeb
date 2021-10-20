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
        try
        {
            // Comprueba si está recibiendo un objeto vacío, en tal caso borra todo
            if(Object.keys(productRawObject).length === 0) {setProductosSeleccionados([]); return;}
            let prodsRepes = productosSeleccionados.filter(p => p._id == productRawObject._id);
            var finalList = productosSeleccionados.filter(p => p._id != productRawObject._id);

            // Elimina un producto de la lista de productos en carrito en caso de que su cantidad == 0
            if(prodsRepes && productRawObject.cantidad <= 0) 
            {
                if(prodsRepes[0].cantidad == 1) { setProductosSeleccionados(finalList); return; }
            }

            // En caso de querer añadir un producto que ya está en el carrito
            if(prodsRepes.length > 0) {             
                // Se suma uno o resta uno en función de la cantidad
                const prodCant = productRawObject.cantidad < 0 ? parseInt(prodsRepes[0].cantidad - 1) : parseInt(prodsRepes[0].cantidad + 1); 
                
                // En caso de detectar el boton menos cliqueado cuando la cantidad es NaN, se elimina dicho producto
                if(prodsRepes[0].cantidad == "" && productRawObject.cantidad < 0) { setProductosSeleccionados(finalList); return; } 

                // Crea el objeto del producto a añadir
                let prodToAdd = {_id: productRawObject._id, cantidad: prodCant};
                
                // En caso de que la cantidad se esté cambiando por teclado
                if(productRawObject.valorEscrito) {
                    // Si se escribe 0, elimina dicho producto
                    if(productRawObject.cantidad == 0) { setProductosSeleccionados(finalList);  return; }
                    // En caso de que reciba un NaN, pone un "" en su lugar
                    if(isNaN(productRawObject.cantidad)) prodToAdd = {_id: productRawObject._id, cantidad: "", valorEscrito: true};
                    // En caso contrario, el objeto sirve para añadir al carrito
                    else prodToAdd = productRawObject;
                }

                // Pone el objeto en la fila que correcta, sin desbaratar el carrito
                const index = productosSeleccionados.findIndex(p => p._id == productRawObject._id);
                productosSeleccionados[index] = prodToAdd;
                setProductosSeleccionados([...productosSeleccionados]);
            }
            // En caso de que este producto no esté ya en carrito, se añade
            else {
                var prodToList = {_id: productRawObject._id, cantidad: parseInt(1)};
                productosSeleccionados.push(prodToList);
                setProductosSeleccionados([...productosSeleccionados])
            }
        }catch(err)
        {
            console.log(err);
            setProductosSeleccionados(productosSeleccionados.filter(p => p._id != productRawObject._id));
        }
        finally{
            // Actualiza el precio total
            if(Object.keys(productRawObject).length === 0) {
                setPrecioTotal(0);
            }
            else {
                SetPrecioTotal(productosSeleccionados, allProductos);
            }
        }
    }

    const SetPrecioTotal = (productosEnCarrito, productosEnBD) => {
        var precioTotal = productosEnCarrito.reduce((total, prodActual) => {
            return total + (prodActual.cantidad * productosEnBD.find(p => p._id == prodActual._id).precioVenta); 
        }, 0);

        console.log(precioTotal);
        setPrecioTotal(precioTotal);
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


