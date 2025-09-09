import {Doc} from "../../../../convex/_generated/dataModel";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, Copy, Globe} from "lucide-react";
import {useState} from "react";
import {useOrigin} from "@/hooks/use-origin";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {toast} from "sonner";

interface PublishProps {
    initialData: Doc<"documents">
}

export const Publish = ({initialData}: PublishProps) => {
    const origin = useOrigin()
    const updateDocument = useMutation(api.documents.updateDocument)

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);

    const url = `${origin}/preview/${initialData?._id}`;

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = updateDocument({
            id: initialData?._id,
            isPublished: true
        }).finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Note published!",
            error: "Failed to publish note.",
        });
    }

    const onUnpublish = () => {
        setIsSubmitting(true);

        const promise = updateDocument({
            id: initialData?._id,
            isPublished: false
        }).finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Note unpublished",
            error: "Failed to unpublish note.",
        });
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true);

        setTimeout(() => setCopied(false), 1000);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="active"
                    size="sm"
                >Publish
                    {initialData?.isPublished && (
                        <Globe className="ml-2 h-4 w-4 "/>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
                {initialData?.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="h-4 w-4  animate-pulse"/>
                            <p className="text-xs font-medium ">
                                This document is live on the web.
                            </p>
                        </div>

                        <div className="flex items-center">
                            <input
                                value={url}
                                className="h-8 flex-1 rounded-l-md bg-muted px-2 text-xs"
                                disabled
                            />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4"/>
                                ) : (
                                    <Copy className="h-4 w-4"/>
                                )}
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            className="w-full text-xs"
                            disabled={isSubmitting}
                            onClick={onUnpublish}
                        >Unpublish</Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="mb-2 h-4 w-4 text-muted-foreground"/>
                        <p>Publish this note</p>
                        <span className="mb-4 text-xs text-muted-foreground">
                            Share your work with others
                        </span>

                        <Button
                            size="sm"
                            onClick={onPublish}
                            disabled={isSubmitting}
                            className="text-xs"
                        >Publish</Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}