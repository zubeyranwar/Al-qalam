import {create} from "zustand";

type Search = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
}

export const useSearch = create<Search>((set,get) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    toggle: () => set({isOpen: !get().isOpen})
}))