import { create } from 'zustand';
import { LatLng } from 'react-native-maps';

interface LocationState {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  setMoveLocation: (moveLocation: LatLng | null) => void;
  setSelectLocation: (location: LatLng | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  moveLocation: null,
  selectLocation: null,
  setMoveLocation: (moveLocation: LatLng | null) => {
    set((state) => ({ ...state, moveLocation }));
  },
  setSelectLocation: (selectLocation: LatLng | null) => {
    set((state) => ({ ...state, selectLocation }));
  },
}));
