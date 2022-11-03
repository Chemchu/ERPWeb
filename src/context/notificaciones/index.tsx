import React, { useContext, createContext } from "react";

type Notificaciones = {
  Mensajes: string[];
  SetMensajes: React.Dispatch<React.SetStateAction<string[]>>;
  ShowModal: boolean,
  SetShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<Notificaciones>({} as Notificaciones);
export const NotificacionesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mensajes, setMensajes] = React.useState<string[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const values: Notificaciones = {
    Mensajes: mensajes,
    SetMensajes: setMensajes,
    ShowModal: showModal,
    SetShowModal: setShowModal
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
