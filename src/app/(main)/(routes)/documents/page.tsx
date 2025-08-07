"use client"

import {Metadata} from "next";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/use-auth";
import {useMutation} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {RouterPaths} from "@/constants/routerPaths";


export default function DocumentsPage() {
    const {session} = useAuth()
    const router = useRouter()
    const createDocument = useMutation(api.documents.createDocument)

    const handleCreateDocument =  () => {
        const promise = createDocument({title: "Untitled"}).then(documentId => {
           router.push(`${RouterPaths.DOCUMENTS}/${documentId}`)
        })

        toast.promise(promise, {
            loading: "Creating new note",
            success: "New note create",
            error: "Failed to create note",
        })

    }

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen dark:bg-[#1f1f1f]">
            <Image
                src="/empty.png"
                alt="empty"
                height="300"
                width="300"
                priority
                className="h-auto dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                alt="empty"
                height="300"
                width="300"
                priority
                className="hidden h-auto dark:block"
            />

            <span className="mt-2 text-lg">Welcome to {session?.user?.name}&apos; qalam </span>
            <Button className="mt-8" onClick={handleCreateDocument}>Create a note</Button>

        </div>
    )
}
