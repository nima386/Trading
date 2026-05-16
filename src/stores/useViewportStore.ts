import { create } from 'zustand';

interface ViewportState {
  offsetX: number;
  offsetY: number;
  scale: number;
  pan: (dx: number, dy: number) => void;
  zoom: (factor: number, centerX: number, centerY: number) => void;
  reset: () => void;
}

export const useViewportStore = create<ViewportState>((set, get) => ({
  offsetX: 0,
  offsetY: 0,
  scale: 1,

  pan: (dx, dy) => {
    const { offsetX, offsetY } = get();
    set({ offsetX: offsetX + dx, offsetY: offsetY + dy });
  },

  zoom: (factor, centerX, centerY) => {
    const { scale, offsetX, offsetY } = get();
    const newScale = Math.min(Math.max(scale * factor, 0.3), 3);
    const ratio = newScale / scale;
    set({
      scale: newScale,
      offsetX: centerX - (centerX - offsetX) * ratio,
      offsetY: centerY - (centerY - offsetY) * ratio,
    });
  },

  reset: () => set({ offsetX: 0, offsetY: 0, scale: 1 }),
}));
