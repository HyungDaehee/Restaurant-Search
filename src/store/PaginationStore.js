import { create } from 'zustand';

const usePaginationStore = create((set) => ({
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    itemsPerPage: 10, // 페이지당 아이템 수
}));

export default usePaginationStore;
