import { create } from "zustand";

const useCurResStore = create((set) => ({
    CurResults: [],
    setCurResults: (data) => set({ CurResults: Array.isArray(data) ? data : [] }),
}));

export default useCurResStore;
