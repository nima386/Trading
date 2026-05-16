import { useEffect } from 'react';
import { TopBar } from './components/Layout/TopBar';
import { Toolbar } from './components/Layout/Toolbar';
import { PropertiesPanel } from './components/Layout/PropertiesPanel';
import { ChartCanvas } from './components/Canvas/ChartCanvas';
import { useCandleStore } from './stores/useCandleStore';
import { useDrawingStore } from './stores/useDrawingStore';

export default function App() {
  const deleteCandle = useCandleStore((s) => s.deleteCandle);
  const selectedCandleId = useCandleStore((s) => s.selectedCandleId);
  const deleteDrawing = useDrawingStore((s) => s.deleteDrawing);
  const selectedDrawingId = useDrawingStore((s) => s.selectedDrawingId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        if (selectedCandleId) deleteCandle(selectedCandleId);
        if (selectedDrawingId) deleteDrawing(selectedDrawingId);
      }
      if (e.key === 'Escape') {
        useCandleStore.getState().selectCandle(null);
        useDrawingStore.getState().selectDrawing(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCandleId, selectedDrawingId, deleteCandle, deleteDrawing]);

  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Toolbar />
        <ChartCanvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}
