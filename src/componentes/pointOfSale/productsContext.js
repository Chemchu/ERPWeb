import {useState, createContext, useContext} from 'react'

const ProductsContext = createContext();
const ProductsUpdateContext = createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
}

export const useProductsUpdate = () => {
    return useContext(ProductsUpdateContext);
}

export const ProductsProvider = (props) => {
    const [productos, setProductos] = useState([]);

    function updateProductList (prods) {
        setProductos([...prods]);
        // console.log(productos);
        // console.log(prods);
    }

    return (
        <div>
            <ProductsContext.Provider value={productos}>
                <ProductsUpdateContext.Provider value={updateProductList}>
                    {props.children}
                </ProductsUpdateContext.Provider>
            </ProductsContext.Provider>
        </div>        
    )
}


