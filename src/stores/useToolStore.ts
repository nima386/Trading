import { create } from 'zustand';
import type { ToolType } from '../types/tool';

interface ToolState {
  activeTool: ToolType;
  drawingColor: string;
  lineWidth: number;
  setTool: (tool: ToolType) => void;
  setDrawingColor: (color: string) => void;
  setLineWidth: (width: number) => void;
}

export const useToolStore = create<ToolState>((set) => ({
  activeTool: 'select',
  drawingColor: '#3b82f6',
  lineWidth: 2,
  setTool: (tool) => set({ activeTool: tool }),
  setDrawingColor: (color) => set({ drawingColor: color }),
  setLineWidth: (width) => set({ lineWidth: width }),
}));
