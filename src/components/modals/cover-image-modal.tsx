"use client"

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {SingleImageDropzone} from "@/components/single-image-dropzone";
import {useCoverImage} from "@/hooks/useCoverImage";
import {useState} from "react";
import {useMutation} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {useEdgeStore} from "@/lib/edgestore";
import {useParams} from "next/navigation";
import {Id} from "../../../convex/_generated/dataModel";

export const CoverImageModal = () => {
    const params = useParams();

    const coverImage = useCoverImage()
    const update = useMutation(api.documents.updateDocument)
    const {edgestore} = useEdgeStore()

    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose()
    }

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            const response = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url
                }
            })

            await update({
                id: params.documentId as Id<"documents">,
                coverImage: response.url
            })

            onClose()
        }
    }

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogTitle className="sr-only">
                Change cover image
            </DialogTitle>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    dropzoneOptions={{
                        maxFiles: 15,
                    }}
                    disabled={isSubmitting}
                    value={file}
                    onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    )
}