"use client"

import {File,} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {useSearch} from "@/hooks/useSearch";
import {useEffect} from "react";
import {useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";
import {useRouter} from "next/navigation";
import {RouterPaths} from "@/constants/routerPaths";

export default function SearchCommand() {
    const router = useRouter()

    const isOpen = useSearch((state) => state.isOpen)
    const toggle = useSearch((state) => state.toggle)
    const onClose = useSearch((state) => state.onClose)

    const documents = useQuery(api.documents.getDocuments, {
        parentDocument: undefined
    })

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search your note...`}/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                {
                    (documents && documents?.length > 0) && (
                        <CommandGroup heading="Documents">
                            {documents.map((document) => (
                                <CommandItem
                                    key={document._id}
                                    value={document._id}
                                    title={document.title}
                                    onSelect={() => router.push(`${RouterPaths.DOCUMENTS}/${document._id}`)}
                                >
                                    <File/>
                                    <span>{document.title}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )
                }
            </CommandList>
        </CommandDialog>
    )
}
