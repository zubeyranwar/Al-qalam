"use client"

import {Button} from "@/components/ui/button";
import {Id} from "../../../../convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {toast} from "sonner";
import {RouterPaths} from "@/constants/routerPaths";
import {useParams, useRouter} from "next/navigation";

interface BannerProps {
    documentId: Id<"documents">;
}

export const Banner = ({documentId}: BannerProps) => {
    const params = useParams()
    const router = useRouter()

    const restoreDocument = useMutation(api.documents.restoreDocument)
    const removeDocument = useMutation(api.documents.removeDocument)

    const onRestore = () => {
        console.log({params: params.documentId})
        if (!params?.documentId) return

        const promise = restoreDocument({id: params?.documentId as Id<"documents">})

        toast.promise(promise, {
            loading: "Restoring note..",
            success: "Note restored!",
            error: "Failed to restore note.",
        });
    }
    const onRemove = () => {
        if (!params?.documentId) return

        const promise = removeDocument({id: params?.documentId as Id<"documents">})

        toast.promise(promise, {
            loading: "Deleting note..",
            success: "Note deleted!",
            error: "Failed to delete note.",
        });

        if (params.documentId === documentId) {
            router.push(RouterPaths.DOCUMENTS)
        }
    }
    return (
        <div
            className="w-full bg-secondary/90  text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p className="text-lg">
                This page is in trash.
            </p>

            <Button
                onClick={onRestore}
                size="sm"
                variant="secondary"
            >
                Restore page
            </Button>
            <Button
                onClick={onRemove}
                size="sm"
                variant="danger"
            >
                Delete forever
            </Button>
        </div>
    )
}