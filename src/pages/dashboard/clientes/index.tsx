import { useEffect, useState } from "react";
import ClientesPage from "../../../components/sidebar/Clientes";
import DashboardLayout from "../../../layout";
import { Cliente } from "../../../tipos/Cliente";
import { FetchClientes } from "../../../utils/fetches";

const Clientes = () => {
    const [Clientes, SetClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        const GetAllData = async () => {
            SetClientes(await FetchClientes());
        }
        GetAllData();
    }, []);

    return (
        <ClientesPage Clientes={Clientes} />
    );
}

Clientes.PageLayout = DashboardLayout;

export default Clientes;