import { create } from 'zustand';
import { LatLng } from 'react-native-maps';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (moveLocation: LatLng | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  moveLocation: null,
  setMoveLocation: (moveLocation: LatLng | null) => {
    set((state) => ({ ...state, moveLocation }));
  },
}));
