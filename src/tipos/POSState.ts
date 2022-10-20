export type POSState = {
    EmpleadoUsingTPVState: { isEmpleadoUsingTPV: boolean, setEmpleadoUsingTPV: React.Dispatch<React.SetStateAction<boolean>> }
    PagarState: { showPagarModal: boolean, setShowPagarModal: React.Dispatch<React.SetStateAction<boolean>> }
    AbrirCajaState: { showAbrirCajaModal: boolean, setShowAbrirCajaModal: React.Dispatch<React.SetStateAction<boolean>> }
    CerrarCajaState: { showCerrarCajaModal: boolean, setShowCerrarCajaModal: React.Dispatch<React.SetStateAction<boolean>> }
    TransferirTPVState: { showTransferirTPVModal: boolean, setShowTransferirTPVModal: React.Dispatch<React.SetStateAction<boolean>> }
}