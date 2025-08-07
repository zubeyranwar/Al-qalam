"use client";
import {useEffect, useState} from "react";
import {CoverImageModal} from "@/components/modals/cover-image-modal";
import {SettingModal} from "@/components/modals/setting-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="z-[9999999]">
            <SettingModal/>
            <CoverImageModal/>
        </div>
    );
};