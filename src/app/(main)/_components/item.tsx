import {ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useAuth} from "@/hooks/use-auth";
import {Skeleton} from "@/components/ui/skeleton";
import {Id} from "../../../../convex/_generated/dataModel";
import {cn} from "@/lib/utils";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {RouterPaths} from "@/constants/routerPaths";

interface ItemProps {
    id?: Id<"documents">
    label: string
    icon: LucideIcon
    documentIcon?: string
    level?: number
    expanded?: boolean
    onExpand?: () => void
    isSearch?: boolean
    active?: boolean
    onClick?: () => void
}

const Item = ({
                  label,
                  icon: Icon,
                  isSearch = false,
                  onClick,
                  id,
                  documentIcon,
                  expanded,
                  onExpand,
                  active,
                  level,
              }: ItemProps) => {
    const router = useRouter()
    const {session} = useAuth()
    const create = useMutation(api.documents.createDocument)
    const archive = useMutation(api.documents.archiveDocument)

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return

        const promise = archive({
            id,
        })

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note.",
        });
    }

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;

        const promise = create({
            title: "Untitled",
            parentDocument: id
        }).then((documentId) => {
            router.push(`${RouterPaths.DOCUMENTS}/${documentId}`)
        })

        toast.promise(promise, {
            loading: "Creating new note",
            success: "New note create",
            error: "Failed to create note",
        })
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            key={id ?? ""}
            style={{paddingLeft: level ? `${level * 12 + 12}px` : "12px"}}
            className={cn(
                "group w-full min-h-[1.6875rem] flex items-center gap-2 cursor-pointer text-muted-foreground hover:bg-primary/5 text-sm font-medium pr-3 py-1",
                active && "bg-primary/5 text-primary",
            )}
            onClick={onClick}
        >
            {!!id && (
                <div className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600" onClick={handleExpand}>
                    <ChevronIcon className="w-4 h-4 shrink-0 text-muted-foreground/50"/>
                </div>
            )}

            {documentIcon ? (
                <div className="mr-2 shrink-0 text-[1.125rem]">{documentIcon}</div>
            ) : (
                <Icon className="w-5 h-5"/>
            )}

            <span className="truncate">{label}</span>

            {isSearch && (
                <kbd
                    className="pointer-events-none inline-flex select-none items-center gap-1 px-1.5 bg-muted rounded border font-medium font-mono text-[.625rem] opacity-100 dark:bg-neutral-700">
                    <span className="font-xs">⌘</span>K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                            <div role="button"
                                 className="ml-auto h-full  opacity-0 rounded-sm bg-neutral-300 group-hover:opacity-100 dark:bg-neutral-600">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4"/>
                                Trash
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div className="p-2 text-xs text-muted-foreground">
                                    Last edited by: {session?.user?.name}
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600"
                    >
                        <Plus className="h-4 w-4 text-muted-foreground"/>
                    </div>
                </div>
            )
            }
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({level}: { level?: number }) {
    return (
        <div
            style={{paddingLeft: level ? `${level * 12 + 25}px` : "12px"}}
            className="flex gap-2 py-[.1875rem]"
        >
            <Skeleton className="h-4 w-4 bg-neutral-300"/>
            <Skeleton className="h-4 w-[30%] bg-neutral-300"/>
        </div>
    )
}

export default Item