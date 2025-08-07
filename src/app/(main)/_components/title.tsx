import {Button} from "@/components/ui/button";
import {useRef, useState} from "react";
import {Input} from "@/components/ui/input";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {Doc} from "../../../../convex/_generated/dataModel";
import {Skeleton} from "@/components/ui/skeleton";

interface TitleProps {
    initialData: Doc<"documents">
}

export const Title = ({initialData}: TitleProps) => {
    const updateDocument = useMutation(api.documents.updateDocument)

    const inputRef = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState(initialData?.title || "Untitled");
    const [isEditing, setIsEditing] = useState(false);


    const enableInput = () => {
        setTitle(initialData?.title || "Untitled");
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, initialData?.title?.length);
        }, 0);
    }

    const disableInput = () => {
        setIsEditing(false);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        updateDocument({
            id: initialData?._id,
            title: event.target.value || "Untitled"
        })
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") disableInput()
    }
    return (
        <div className="w-fit">
            {isEditing ?
                (<Input
                    ref={inputRef}
                    value={title}
                    onClick={enableInput}
                    onChange={onChange}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    className="h-7 px-2 focus-visible:ring-transparent"
                />) : (
                    <Button
                        onClick={enableInput}
                        size="sm"
                        variant="ghost"
                    >
                        <span className="truncate">{initialData?.title}</span>
                    </Button>
                )}
        </div>
    )
}

Title.Skeleton = function TileSkeleton() {
    return <Skeleton className="h-4 w-20 rounded-md"/>
}