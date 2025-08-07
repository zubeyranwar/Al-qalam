"use client"

import {MenuIcon} from "lucide-react";
import {Publish} from "@/app/(main)/_components/publish";
import {Title} from "@/app/(main)/_components/title";
import {useParams} from "next/navigation";
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";
import {Menu} from "./menu";
import {Banner} from "@/app/(main)/_components/banner";

interface NavbarProps {
    isCollapsed: boolean
    onResetWidth: () => void
}

export const Navbar = ({isCollapsed, onResetWidth}: NavbarProps) => {
    const params = useParams()
    const document = useQuery(api.documents.getDocumentById, {
        documentId: params?.documentId as Id<"documents">
    })

    if (document === undefined) {
        return (
            <nav className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1f1f1f]">
                <Title.Skeleton/>
                <div className="flex items-center">
                    <Menu.Skeleton/>
                </div>

            </nav>
        )
    }

    if (document === null) {
        return null
    }

    return (
        <>
            <nav className="flex w-full items-center gap-x-2 bg-background px-3 py-2 dark:bg-[#1f1f1f]">
                {isCollapsed && (
                    <button aria-label="Menu">
                        <MenuIcon
                            onClick={onResetWidth}
                            className="h-6 w-6 text-muted-foreground"
                        />
                    </button>
                )}

                <div className="flex w-full items-center justify-between">
                    <Title initialData={document}/>
                    <div className="flex items-center gap-x-2">
                        <Publish initialData={document}/>
                        <Menu documentId={document._id}/>
                    </div>
                </div>
            </nav>
            {document.isArchived && <Banner documentId={document._id}/>}
        </>
    )
}
