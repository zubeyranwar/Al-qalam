import {Id} from "../../../../convex/_generated/dataModel";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontalIcon, Trash} from "lucide-react";
import {useAuth} from "@/hooks/use-auth";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {toast} from "sonner";
import {RouterPaths} from "@/constants/routerPaths";
import {useRouter} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";

interface MenuProps {
    documentId: Id<"documents">
}

export const Menu = ({documentId}: MenuProps) => {
    const router = useRouter()
    const {session} = useAuth()

    const archiveDocument = useMutation(api.documents.archiveDocument)

    const onArchive = () => {
        const promise = archiveDocument({
            id: documentId
        })

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note.",
        })

        router.push(RouterPaths.DOCUMENTS)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontalIcon className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div className="text-muted-foreground text-xs p-2">
                        Last edited by {session?.user?.name}
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


Menu.Skeleton = function MenuSkeleton() {
    return <Skeleton className="h-8 w-8"/>
}