import React, { useContext, createContext } from 'react';

type InformacionTienda = {
    NombreTienda: string,
    SetNombreTienda: React.Dispatch<React.SetStateAction<string>>
    DireccionTienda: string,
    SetDireccionTienda: React.Dispatch<React.SetStateAction<string>>,
    CIF: string
    SetCIF: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<InformacionTienda>({} as InformacionTienda);
export const DatosTiendaContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [nombreTienda, setNombreTienda] = React.useState<string>("")
    const [direccion, setDireccion] = React.useState<string>("")
    const [cif, setCif] = React.useState<string>("")

    const values: InformacionTienda = {
        NombreTienda: nombreTienda || "ERPWeb",
        SetNombreTienda: setNombreTienda,
        DireccionTienda: direccion || "",
        SetDireccionTienda: setDireccion,
        CIF: cif || "",
        SetCIF: setCif,
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useDatosTiendaContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando los datos de la tienda Context!!!');
    }

    return context;
}

export default useDatosTiendaContext;