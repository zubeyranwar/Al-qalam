import {createContext, ReactNode, useContext, useState} from "react";

interface SidebarContextType {
    isCollapsed: boolean
    setIsCollapsed: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)
export default function SidebarProvider({
    children
                                        }: {
    children: ReactNode
}) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <SidebarContext.Provider value={{isCollapsed, setIsCollapsed}}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext)

    if(context === undefined){
        throw new Error("useSidebar must be used within SidebarProvider")
    }
    return context
}