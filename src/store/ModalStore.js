import { create } from "zustand";

const useModalStore = create((set) => ({
    isOpen: false,
    content: '',
    title: 'Details',
    openModal: (content, title = 'Details') => set({ isOpen: true, content, title }),
    closeModal: () => set({ isOpen: false, content: '', title: 'Details' }),
}));

export default useModalStore;