"use client"
import {BlockNoteView} from "@blocknote/mantine";
import {useCreateBlockNote} from "@blocknote/react";
import {BlockNoteEditor, PartialBlock} from "@blocknote/core";
import {useTheme} from "next-themes";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";

interface EditorProps {
    onChange?: (value: string) => void | undefined;
    initialContent?: string;
    editable?: boolean;
}

export default function Editor({
                                   initialContent, editable, onChange
                               }: EditorProps) {
    const {resolvedTheme} = useTheme()

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock : undefined,
    })

    const handleEditorChange = () => {
        onChange?.(JSON.stringify(editor.document, null, 2))
    }
    return (
        <div>
            <BlockNoteView
                editable={editable}
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={handleEditorChange}
            />
        </div>
    )
}