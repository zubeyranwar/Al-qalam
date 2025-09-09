import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {useCoverImage} from "@/hooks/useCoverImage";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {useParams} from "next/navigation";
import {Id} from "../../../../convex/_generated/dataModel";
import {useEdgeStore} from "@/lib/edgestore";
import {ImageIcon, X} from "lucide-react";
import {cn} from "@/lib/utils";
import {toast} from "sonner";

interface CoverProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({url, preview}: CoverProps) => {
    const params = useParams()
    const {edgestore} = useEdgeStore()

    const removeCoverImage = useMutation(api.documents.removeCoverImage)
    const coverImage = useCoverImage()


    const onRemove = async () => {
        try {
            if (url) {
                await edgestore.publicFiles.delete({
                    url: url,
                })
            }

            const promise = removeCoverImage({
                id: params.documentId as Id<"documents">
            })
            toast.promise(promise, {
                loading: "Removing cover image...",
                success: "Cover image is removed!",
                error: "Failed to remove image.",
            });
        } catch {
            return
        }
    }

    return (
        <div
            className={cn(
                "group relative w-full h-[35vh]",
                !url && "h-[12vh]",
                url && "bg-muted"
            )}
        >
            {!!url && <Image src={url} alt="Cover image" fill priority className="object-cover"/>}

            {url && !preview && (
                <div
                    className="absolute bottom-4 right-2 flex items-center gap-4 opacity-0 group-hover:opacity-100">
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        variant="secondary"
                        className="text-xs text-muted-foreground"
                        size="sm"
                    >
                        <ImageIcon className="mr-2 h-4 w-4"/>
                        Change cover</Button>
                    <Button
                        onClick={onRemove}
                        variant="danger"
                        className="text-xs text-muted-foreground"
                        size="sm"
                    >
                        <X className="mr-2 h-4 w-4"/>
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton() {
    return <Skeleton className="h-[10vh] w-full"/>
}