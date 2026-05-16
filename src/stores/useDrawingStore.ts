import { create } from 'zustand';
import type { DrawingObject } from '../types/drawing';

interface DrawingState {
  drawings: DrawingObject[];
  selectedDrawingId: string | null;
  addDrawing: (drawing: DrawingObject) => void;
  updateDrawing: (id: string, updates: Partial<DrawingObject>) => void;
  deleteDrawing: (id: string) => void;
  selectDrawing: (id: string | null) => void;
}

export const useDrawingStore = create<DrawingState>((set, get) => ({
  drawings: [],
  selectedDrawingId: null,

  addDrawing: (drawing) => {
    set({ drawings: [...get().drawings, drawing] });
  },

  updateDrawing: (id, updates) => {
    set({
      drawings: get().drawings.map((d) =>
        d.id === id ? { ...d, ...updates } as DrawingObject : d
      ),
    });
  },

  deleteDrawing: (id) => {
    set({
      drawings: get().drawings.filter((d) => d.id !== id),
      selectedDrawingId: null,
    });
  },

  selectDrawing: (id) => set({ selectedDrawingId: id }),
}));
