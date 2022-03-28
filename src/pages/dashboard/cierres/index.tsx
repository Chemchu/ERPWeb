import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import CierrePage from "../../../components/sidebar/Cierres";
import DashboardLayout from "../../../layout";
import { Cierre } from "../../../tipos/Cierre";
import { TPVType } from "../../../tipos/TPV";
import { FetchCierres, FetchTPVs } from "../../../utils/fetches";

const Cierres = () => {
    const [CierresList, SetCierres] = useState<Cierre[]>([]);
    const [tpvs, SetTpvs] = useState<TPVType[]>([]);

    useEffect(() => {
        const GetAllData = async () => {
            SetCierres(await FetchCierres());
            SetTpvs(await FetchTPVs());
        }
        GetAllData();
    }, []);

    if (CierresList.length <= 0) {
        return (
            <div>
                Cargando..
            </div>
        )
    }

    return (
        <Tab.Group as="div" className="flex flex-col w-full h-full pt-3 pr-2">
            <Tab.List className="flex gap-1 h-10 pr-10">
                <Tab
                    key={"Cierres"}
                    className={({ selected }) =>
                        classNames(
                            'w-1/4 h-full text-sm rounded-t-2xl border-t border-x',
                            'focus:outline-none ring-white ring-opacity-60',
                            selected
                                ? 'bg-white shadow-lg'
                                : 'bg-gray-200 hover:bg-blue-400 hover:text-white'
                        )
                    }
                >
                    <span className='text-xl'>
                        Cierre
                    </span>
                </Tab>
            </Tab.List>
            <Tab.Panels className="flex flex-col h-90v w-full pr-2">
                <Tab.Panel
                    key={"Cierres"}
                    className={classNames(
                        'pb-3 h-full w-full',
                        'focus:outline-none ring-white ring-opacity-60'
                    )}
                >
                    <CierrePage cierres={CierresList} tpvs={tpvs} />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group >
    );
}

Cierres.PageLayout = DashboardLayout;

export default Cierres;

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}