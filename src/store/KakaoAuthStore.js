import { create } from 'zustand';

const KakaoAuthStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));

export default KakaoAuthStore;