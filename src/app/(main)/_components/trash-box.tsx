import {Search, Trash, Undo} from "lucide-react";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {useParams, useRouter} from "next/navigation";
import {RouterPaths} from "@/constants/routerPaths";
import {Id} from "../../../../convex/_generated/dataModel";
import Spinner from "@/components/spinner";
import {ConfirmModal} from "@/components/modals/confirm-modal";
import {toast} from "sonner";

export default function TrashBox() {
    const router = useRouter()
    const params = useParams()

    const documents = useQuery(api.documents.getTrashDocuments)
    const restoreDocument = useMutation(api.documents.restoreDocument)
    const removeDocument = useMutation(api.documents.removeDocument)

    const [search, setSearch] = useState("")

    const filteredDocuments = documents?.filter(document => {
        return document.title.toLowerCase().includes(search)
    })

    const onRestore = ({event, documentId}: {
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        documentId: Id<"documents">
    }) => {
        event.stopPropagation()
        const promise = restoreDocument({id: documentId})

        toast.promise(promise, {
            loading: "Restoring note..",
            success: "Note restored!",
            error: "Failed to restore note.",
        });
    }
    const onRemove = (documentId: Id<"documents">) => {
        const promise = removeDocument({id: documentId})

        toast.promise(promise, {
            loading: "Deleting note..",
            success: "Note deleted!",
            error: "Failed to delete note.",
        });

        if (params.documentId === documentId) {
            router.push(RouterPaths.DOCUMENTS)
        }
    }

    if (filteredDocuments === undefined) {
        return (
            <div
                className="flex items-center justify-center p-4"
                aria-busy="true"
                aria-label="loading"
            >
                <Spinner size="lg"/>
            </div>
        )
    }

    return (
        <section className="text-sm">
            <div className="flex items-center gap-x-2 p-2">
                <Search className="h-4 w-4"/>
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
                    placeholder="Filter your note by title..."
                    aria-label="Filter your note by title"
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                {filteredDocuments?.length === 0 && (
                    <p className="pb-2 text-center text-muted-foreground text-xs">No documents found.</p>
                )}

                {filteredDocuments?.map((document) => (
                    <div
                        key={document._id}
                        onClick={() => router.push(`${RouterPaths.DOCUMENTS}/${document._id}`)}
                        className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
                        aria-label="Document"
                    >
                        <span className="truncate pl-2">{document.title}</span>
                        <div className="flex items-center">
                            <button
                                onClick={(event) => onRestore({event, documentId: document._id})}
                                className="rounded-sm p-2 hover:accent-neutral-200 dark:hover:bg-neutral-600"
                                aria-label="Restore Document"
                            >
                                <Undo className="w-4 h-4 text-muted-foreground"/>
                            </button>
                            <ConfirmModal onConfirm={() => onRemove(document._id)}>
                                <button
                                    className="rounded-sm p-2 hover:bg-neutral-200 dark:bg-neutral-600"
                                    aria-label="Delete Permanently"
                                >
                                    <Trash className="h-4 w-4 text-muted-foreground"/>
                                </button>
                            </ConfirmModal>
                            <button></button>
                        </div>

                    </div>))
                }
            </div>
        </section>
    )
}