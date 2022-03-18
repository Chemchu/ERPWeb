import { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import { Cierre } from "../../../tipos/Cierre";
import { FetchCierres } from "../../../utils/fetches";

const CierresPage = () => {
    const [Cierres, SetCierres] = useState<Cierre[]>([]);

    useEffect(() => {
        const GetAllData = async () => {
            SetCierres(await FetchCierres());
        }
        GetAllData();
    }, []);

    if (Cierres.length <= 0) {
        return (
            <div>
                Yey
            </div>
        )
    }

    return (
        <div>
            Cierres
            {
                Cierres.length
            }
        </div>
    );
}

CierresPage.PageLayout = DashboardLayout;

export default CierresPage;