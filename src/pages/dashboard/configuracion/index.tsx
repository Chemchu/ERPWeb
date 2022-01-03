import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardLayout from "../../../layout";

const ConfiguracionPage = () => {
    const session = useSession();
    const router = useRouter();

    // useEffect(() => {
    //     console.log("porras");
    //     console.log(session);

    //     if (session.status === "unauthenticated") {

    //         router.push('/login');
    //     }
    // }, []);

    return (
        <div>
            Configuracion
        </div>
    );
}

ConfiguracionPage.PageLayout = DashboardLayout;

export default ConfiguracionPage;