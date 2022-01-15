import React, { useContext, createContext } from 'react';

type JwtContextualizado = {
    Jwt: string | undefined,
    SetJwt: React.Dispatch<React.SetStateAction<string | undefined>>,
}

//Context
const AppContext = createContext<JwtContextualizado>({} as JwtContextualizado);

//Provider
export const JwtContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [Jwt, setJwt] = React.useState<string | undefined>("");

    const values: JwtContextualizado = {
        Jwt: Jwt,
        SetJwt: setJwt
    }

    // Interface donde será expuesto como proveedor y envolverá la App.
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useJwtContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando el JWT Context!!!');
    }

    return context;
}

export default useJwtContext;