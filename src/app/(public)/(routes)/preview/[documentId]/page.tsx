"use client"

import {useParams} from "next/navigation";
import {useQuery} from "convex/react";
import {api} from "../../../../../../convex/_generated/api";
import {Id} from "../../../../../../convex/_generated/dataModel";
import {Cover} from "@/app/(main)/_components/cover";
import {Toolbar} from "@/app/(main)/_components/toolbar";
import Editor from "@/app/(main)/_components/editor";
import {Skeleton} from "@/components/ui/skeleton";
import {useMemo} from "react";
import dynamic from "next/dynamic";

const DocumentPreviewPage = () => {
    const Editor = useMemo(
        () => dynamic(() => import("../../../../(main)/_components/editor"), {ssr: false}),
        [],
    );
    const params = useParams();

    const document = useQuery(api.documents.getDocumentById, {
        documentId: params?.documentId as Id<"documents">
    })

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton/>
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]"/>
                        <Skeleton className="h-4 w-[80%]"/>
                        <Skeleton className="h-4 w-[90%]"/>
                        <Skeleton className="h-4 w-[100%]"/>
                    </div>
                </div>
            </div>
        );
    }

    if (document === null) {
        return <div className="flex items-center justify-center h-full">Your document no where to be found!</div>;
    }

    return (
        <div className="pb-40">
            <Cover preview url={document?.coverImage}/>
            <div className="mx-auto md:w-3xl lg:max-w-4xl">
                <Toolbar preview initialData={document}/>
                <Editor
                    initialContent={document?.content}
                    editable={false}
                    onChange={undefined}
                />
            </div>
        </div>
    )
}

export default DocumentPreviewPage;