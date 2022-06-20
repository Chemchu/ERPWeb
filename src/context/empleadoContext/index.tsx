import React, { useContext, createContext } from 'react';
import { SesionEmpleado } from '../../tipos/Empleado';

type EmpleadoContextualizado = {
    Empleado: SesionEmpleado,
    SetEmpleado: Function,
}

//Context
const AppContext = createContext<EmpleadoContextualizado>({} as EmpleadoContextualizado);

//Provider
export const EmpleadoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [Empleado, SetEmpleado] = React.useState<SesionEmpleado>({} as SesionEmpleado);

    const values: EmpleadoContextualizado = {
        Empleado: Empleado,
        SetEmpleado: SetEmpleado
    }

    // Interface donde será expuesto como proveedor y envolverá la App.
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useEmpleadoContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error arrancando el Empleado Context!!!');
    }

    return context;
}

export default useEmpleadoContext;