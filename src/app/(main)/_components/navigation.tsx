"use client"

import {useAuth} from "@/hooks/use-auth";
import NavUser from "@/app/(main)/_components/nav-user";
import {useSidebar} from "@/components/providers/sidebar-provider";

export default function Navigation() {
    const {session, logout} = useAuth()
    const {isCollapsed, setIsCollapsed} = useSidebar()

    const myLoader = () => {
        return session?.user?.image || "";
    }

    return (
        <aside className={`h-full ${isCollapsed ? 'w-[0px]': 'w-[25%]'} bg-sidebar overflow-y-auto px-4`}>
            <NavUser/>
        </aside>
    )
}
