import React, { useContext, createContext } from "react";

type Notificaciones = {
  Mensajes: string[];
  SetMensajes: React.Dispatch<React.SetStateAction<string[]>>;
};

const AppContext = createContext<Notificaciones>({} as Notificaciones);
export const NotificacionesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mensajes, setMensajes] = React.useState<string[]>([]);

  const values: Notificaciones = {
    Mensajes: mensajes,
    SetMensajes: setMensajes,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export function useNotificacionesContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error("Error arrancando las notificaciones Context!!!");
  }

  return context;
}

export default useNotificacionesContext;
