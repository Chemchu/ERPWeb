import {useState, useEffect, createContext} from 'react'
import axios from 'axios';

export const ProductsContext = createContext();

export const ProductsProvider = (props) => {
    const [productos, setProductos] = useState([]);

    return (
        <div>
            <ProductsContext.Provider value={[productos, setProductos]}>
                {props.children}
            </ProductsContext.Provider>
        </div>        
    )
}


