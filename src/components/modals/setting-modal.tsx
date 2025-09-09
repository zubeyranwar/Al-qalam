"use client"

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import ThemeSwitcher from "@/components/theme-switcher";
import {useSetting} from "@/hooks/useSetting";
import {Button} from "@/components/ui/button";
import {useMutation} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {toast} from "sonner";
import {RouterPaths} from "@/constants/routerPaths";
import {useParams, useRouter} from "next/navigation";

export const SettingModal = () => {
    const params = useParams()
    const router = useRouter()
    const setting = useSetting()

    const deleteDocument = useMutation(api.documents.deleteAllDocuments)

    const onDeleteAllDocument = () => {
        const promise = deleteDocument()

        toast.promise(promise, {
            loading: "Deleting all documents...",
            success: "All documents deleted successfully!",
            error: "Failed to delete documents.",
        });

        if (params?.documentId) {
            router.push(RouterPaths.DOCUMENTS)
        }

        setting.onClose()
    }

    return (
        <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
            <DialogTitle className="sr-only">My settings</DialogTitle>
            <DialogContent className="space-y-1 px-6 py-8">
                <DialogHeader>
                    <h2 className="text-lg font-medium">
                        My settings
                    </h2>
                </DialogHeader>
                <div className="flex flex-col gap-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-1">
                            <label>
                                Appearance
                            </label>
                            <span className="text-muted-foreground text-[0.8rem]">
                            Customize how alqalam looks on your device
                        </span>
                        </div>
                        <ThemeSwitcher/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-1">
                            <label>
                                Data
                            </label>
                            <span className="text-muted-foreground text-[0.8rem]">
                            Delete all your notes
                        </span>
                        </div>
                        <Button
                            variant="danger"
                            onClick={onDeleteAllDocument}
                        >
                            Delete all
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}