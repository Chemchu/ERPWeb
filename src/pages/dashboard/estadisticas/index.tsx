import { Tab } from "@headlessui/react";
import DashboardLayout from "../../../layout";

const Stats = () => {
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
                        Estadísticas
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
                    Estadísticas básicas
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group >
    );
}

Stats.PageLayout = DashboardLayout;

export default Stats;

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}