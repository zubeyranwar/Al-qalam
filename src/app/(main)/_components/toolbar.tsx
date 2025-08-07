"use client";

import {ElementRef, useRef, useState} from "react";

import {useMutation} from "convex/react";

import {useCoverImage} from "@/hooks/useCoverImage";

import TextareaAutosize from "react-textarea-autosize";
import {ImageIcon} from "lucide-react";
import {Doc} from "../../../../convex/_generated/dataModel";
import {api} from "../../../../convex/_generated/api";
import {Button} from "@/components/ui/button";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
}

export const Toolbar = ({initialData, preview}: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.documents.updateDocument);
    const coverImage = useCoverImage();

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, initialData.title.length);
        }, 0);
    };

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled",
        });
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    return (
        <div className="group relative pl-12">
            <div className="flex items-center gap-x-1 py-2 group-hover:opacity-100 md:opacity-0">
                {!initialData.coverImage && !preview && (
                    <Button
                        onClick={coverImage.onOpen}
                        className="text-xs text-muted-foreground"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="mr-2 h-4 w-4"/>
                        Add Cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    spellCheck="false"
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="w-fit resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="break-words pb-[.7188rem] text-5xl font-bold  text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
                >
                    {initialData.title}
                </div>
            )}
        </div>
    );
};