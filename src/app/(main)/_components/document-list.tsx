"use client"
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import Item from "@/app/(main)/_components/item";
import {File} from "lucide-react";
import {Fragment, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {RouterPaths} from "@/constants/routerPaths";
import {Doc, Id} from "../../../../convex/_generated/dataModel";
import {cn} from "@/lib/utils";


interface DocumentListProps {
    parentDocumentId?: Id<"documents">
    level?: number;
    data?: Doc<"documents">[]

}

export default function DocumentList({
                                         parentDocumentId,
                                         level = 0,
                                     }: DocumentListProps) {
    const params = useParams();
    const router = useRouter()

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId],
        }));
    };


    const documents = useQuery(api.documents.getDocuments, {
        parentDocument: parentDocumentId
    })

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level}/>
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level}/>
                        <Item.Skeleton level={level}/>
                    </>
                )}
            </>
        )
    }

    return (
        <>
            <p
                style={{paddingLeft: level ? `${level * 12 + 25}px` : undefined}}
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden",
                )}
            >
                No page inside
            </p>


            {
                (documents && documents?.length > 0) && (
                    documents.map((document) => (
                        <Fragment key={document._id}>
                            <Item
                                id={document._id}
                                label={document.title}
                                icon={File}
                                onClick={() => router.push(`${RouterPaths.DOCUMENTS}/${document._id}`)}
                                onExpand={() => onExpand(document._id)}
                                level={level}
                                expanded={expanded[document._id]}
                                active={params.documentId === document._id}
                            />
                            {expanded[document._id] && (
                                <DocumentList parentDocumentId={document._id} level={level + 1}/>
                            )}
                        </Fragment>
                    ))
                )
            }

        </>
    )
}