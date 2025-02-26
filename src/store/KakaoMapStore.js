import { create } from "zustand";

const useMapStore = create((set) => ({
  map: null,
  markers: [],
  setMap: (initializedMap) => set({ map:initializedMap }),
  setMarkers: (updateMarkers) => set({ markers:updateMarkers }),
}));

export default useMapStore;