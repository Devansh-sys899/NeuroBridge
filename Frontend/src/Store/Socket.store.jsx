import { create } from "zustand";

export const useSocketStore = create((set) => ({
    socketReady: false,

    setSocketReady: (ready) => set({
        socketReady: ready
    })
}));



