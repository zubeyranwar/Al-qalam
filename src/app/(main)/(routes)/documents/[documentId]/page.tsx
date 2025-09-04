//@ts-nocheck
"use client"

import {useMutation, useQuery} from "convex/react";
import {api} from "../../../../../../convex/_generated/api";
import {use, useMemo} from "react";
import dynamic from "next/dynamic";
import {Cover} from "@/app/(main)/_components/cover";
import {Skeleton} from "@/components/ui/skeleton";
import {Toolbar} from "@/app/(main)/_components/toolbar";
import {Id} from "../../../../../../convex/_generated/dataModel";

type DocumentIdPageProps = Promise<{ documentId: string }>


export default function DocumentIdPage(props: { params: DocumentIdPageProps }) {
    const Editor = useMemo(
        () => dynamic(() => import("../../../_components/editor"), {ssr: false}),
        [],
    );
    const params = use(props.params);
    const documentId = params.documentId;

    const document = useQuery(api.documents.getDocumentById, {
        documentId: documentId as Id<"documents">
    })
    console.log({baby: document})

    const update = useMutation(api.documents.updateDocument)

    const onChange = (content: string) => {
        update({
            id: documentId as Id<"documents">,
            content
        })
    }

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton/>
                <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-1/2"/>
                        <Skeleton className="h-4 w-4/5"/>
                        <Skeleton className="h-4 w-2/5"/>
                        <Skeleton className="h-4 w-3/5"/>
                    </div>
                </div>
            </div>
        );
    }

    if (document === null) {
        return <div className="flex items-center justify-center h-full">Your document no where to be found!</div>;
    }

    console.log({document})
    return (
        <div className="pb-40">
            <Cover
                url={document.coverImage}
            />
            <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
                <Toolbar initialData={document}/>
                <Editor
                    initialContent={document.content}
                    onChange={onChange}
                />

            </div>
        </div>
    )
}