"use client"

import NavUser from "@/app/(main)/_components/nav-user";
import {ChevronsLeft, MenuIcon, PlusCircle, Search, Settings, Trash} from "lucide-react";
import DocumentList from "@/app/(main)/_components/document-list";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {toast} from "sonner";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useSearch} from "@/hooks/useSearch";
import Item from "./item"
import {RouterPaths} from "@/constants/routerPaths";
import {cn} from "@/lib/utils";
import {ElementRef, useEffect, useRef, useState} from "react";
import {useMediaQuery} from "usehooks-ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Navbar} from "@/app/(main)/_components/navbar";
import {useSetting} from "@/hooks/useSetting";
import TrashBox from "@/app/(main)/_components/trash-box";


export default function Navigation() {
    const params = useParams()
    const router = useRouter()
    const pathname = usePathname()
    const isMobile = useMediaQuery("(max-width: 768px)")
    const search = useSearch()
    const setting = useSetting()
    const createDocument = useMutation(api.documents.createDocument)

    const isResizing = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const [isResetting, setIsResetting] = useState(false)

    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            resetWidth()
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            collapse()
        }
    }, [pathname, isMobile]);

    const collapse = () => {
        console.log({collapsing: true})
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.removeProperty("width");
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            setTimeout(() => setIsResetting(false), 300);
        }
    }


    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        event.stopPropagation()

        isResizing.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`,
            );
        }
    }

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const handleCreateDocument = () => {
        const promise = createDocument({title: "Untitled"}).then(documentId => router.push(`${RouterPaths.DOCUMENTS}/${documentId}`))

        toast.promise(promise, {
            loading: "Creating new note",
            success: "New note create",
            error: "Failed to create note",
        })
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar relative h-full flex flex-col w-60 bg-secondary overflow-y-auto",
                    isResetting && "transition-all duration-300 ease-in-out",
                    isMobile && "w-0"
                )}>

                <div
                    role="button"
                    onClick={collapse}
                    className={cn(
                        "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600 z-[9999]",
                        isMobile && "opacity-100"
                    )}>
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <div>
                    <NavUser/>
                    <Item label="Search" icon={Search} isSearch onClick={search.onOpen}/>
                    <Item label="Settings" icon={Settings} onClick={setting.onOpen}/>
                    <Item label="New page" icon={PlusCircle} onClick={handleCreateDocument}/>
                </div>

                <div className="mt-4">
                    <DocumentList/>
                    <Popover>
                        <PopoverTrigger className="mt-4 w-full">
                            <Item label="Trash" icon={Trash}/>
                        </PopoverTrigger>
                        <PopoverContent
                            side={isMobile ? "bottom" : "right"}
                            className="w-72p-0"
                        >
                            <TrashBox/>
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"></div>
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute left-60 top-0 z-10 w-[calc(100%-240px)]",
                    isResetting && "transition-all duration-300 ease-in-out",
                    isMobile && "left-0 w-full"
                )}
            >
                {params?.documentId ? (
                    <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth}/>
                ) : (
                    <nav className={cn(
                        "w-full bg-transparent px-3 py-2",
                        !isCollapsed && "p-0"
                    )}>
                        {isCollapsed && (
                            <MenuIcon
                                role="button"
                                onClick={resetWidth}
                                className="h-6 w-6 text-muted-foreground"
                            />
                        )}
                    </nav>
                )}
            </div>
        </>
    )
}
