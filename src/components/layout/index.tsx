import { useRouter } from "next/router";
import React, { useState } from "react";
import SideBar from "../sidebar/sidebar";

type DashboardLayoutProps = {
    children: React.ReactNode,
};


const Layout = ({ children }: DashboardLayoutProps) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

    if (useRouter().pathname.includes("/dashboard")) {
        return (
            <main className="bg-gray-100 dark:bg-gray-800 h-screen w-screen overflow-hidden relative">
                <div className="flex items-start justify-start">
                    <div className="m-2">
                        <SideBar isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} />
                    </div>
                    <div className="w-screen h-screen">
                        {children}
                    </div>
                </div>
            </main>

        );
    }

    return (
        <>
            {children}
        </>
    );
}

export default Layout;