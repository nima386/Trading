import { Trash2 } from 'lucide-react';
import { useCandleStore } from '../../stores/useCandleStore';
import { useDrawingStore } from '../../stores/useDrawingStore';
import { useToolStore } from '../../stores/useToolStore';
import { isBullish } from '../../types/candle';

const PRESET_COLORS = ['#3b82f6', '#ef4444', '#00c087', '#facc15', '#a855f7', '#f97316', '#ffffff'];

export function PropertiesPanel() {
  const { candles, selectedCandleId, updateCandle, deleteCandle } = useCandleStore();
  const { drawings, selectedDrawingId, deleteDrawing } = useDrawingStore();
  const { drawingColor, setDrawingColor, lineWidth, setLineWidth } = useToolStore();

  const selectedCandle = candles.find((c) => c.id === selectedCandleId);
  const selectedDrawing = drawings.find((d) => d.id === selectedDrawingId);

  return (
    <div className="w-56 bg-[#1a1d28] border-l border-[#2a2d3a] flex flex-col p-3 gap-4 overflow-y-auto">
      <h3 className="text-xs font-semibold text-[#8b8fa3] uppercase tracking-wider">Eigenschaften</h3>

      {selectedCandle && (
        <div className="flex flex-col gap-3">
          <div className="text-sm text-[#e1e4eb]">
            Candle #{selectedCandle.index + 1}
            <span className={`ml-2 text-xs ${isBullish(selectedCandle) ? 'text-[#00c087]' : 'text-[#ef4444]'}`}>
              {isBullish(selectedCandle) ? 'Bullish' : 'Bearish'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex flex-col gap-1">
              <span className="text-[#8b8fa3]">Open</span>
              <input
                type="number"
                value={Math.round(selectedCandle.open * 10) / 10}
                onChange={(e) => updateCandle(selectedCandle.id, { open: +e.target.value })}
                className="bg-[#252836] border border-[#2a2d3a] rounded px-2 py-1 text-[#e1e4eb] w-full"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[#8b8fa3]">Close</span>
              <input
                type="number"
                value={Math.round(selectedCandle.close * 10) / 10}
                onChange={(e) => updateCandle(selectedCandle.id, { close: +e.target.value })}
                className="bg-[#252836] border border-[#2a2d3a] rounded px-2 py-1 text-[#e1e4eb] w-full"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[#8b8fa3]">High</span>
              <input
                type="number"
                value={Math.round(selectedCandle.high * 10) / 10}
                onChange={(e) => updateCandle(selectedCandle.id, { high: +e.target.value })}
                className="bg-[#252836] border border-[#2a2d3a] rounded px-2 py-1 text-[#e1e4eb] w-full"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[#8b8fa3]">Low</span>
              <input
                type="number"
                value={Math.round(selectedCandle.low * 10) / 10}
                onChange={(e) => updateCandle(selectedCandle.id, { low: +e.target.value })}
                className="bg-[#252836] border border-[#2a2d3a] rounded px-2 py-1 text-[#e1e4eb] w-full"
              />
            </label>
          </div>
          <button
            onClick={() => deleteCandle(selectedCandle.id)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#ef4444] bg-[#ef4444]/10 rounded hover:bg-[#ef4444]/20 transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Löschen
          </button>
        </div>
      )}

      {selectedDrawing && (
        <div className="flex flex-col gap-3">
          <div className="text-sm text-[#e1e4eb] capitalize">{selectedDrawing.type}</div>
          <button
            onClick={() => deleteDrawing(selectedDrawing.id)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#ef4444] bg-[#ef4444]/10 rounded hover:bg-[#ef4444]/20 transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Löschen
          </button>
        </div>
      )}

      <div className="border-t border-[#2a2d3a] pt-3">
        <h4 className="text-xs font-semibold text-[#8b8fa3] mb-2">Zeichenfarbe</h4>
        <div className="flex gap-1.5 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setDrawingColor(color)}
              className={`w-6 h-6 rounded-full border-2 transition-colors ${
                drawingColor === color ? 'border-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-[#8b8fa3] mb-2">Linienstärke</h4>
        <input
          type="range"
          min="1"
          max="5"
          value={lineWidth}
          onChange={(e) => setLineWidth(+e.target.value)}
          className="w-full accent-[#3b82f6]"
        />
        <span className="text-xs text-[#8b8fa3]">{lineWidth}px</span>
      </div>
    </div>
  );
}
