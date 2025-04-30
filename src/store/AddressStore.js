import { create } from 'zustand';

const useAddressStore = create((set) => ({
    shortAddress: '',  
    setShortAddress: (shortAddress) => set({ shortAddress: shortAddress }),
}));

export default useAddressStore;
