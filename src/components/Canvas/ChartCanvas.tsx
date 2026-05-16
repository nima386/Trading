import { useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Layer } from 'react-konva';
import type Konva from 'konva';
import { GridLayer } from './GridLayer';
import { CandleLayer } from './CandleLayer';
import { DrawingLayer } from './DrawingLayer';
import { useViewportStore } from '../../stores/useViewportStore';
import { useToolStore } from '../../stores/useToolStore';
import { useCandleStore } from '../../stores/useCandleStore';
import { useDrawingStore } from '../../stores/useDrawingStore';
import type { Point } from '../../types/drawing';

export function ChartCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const { offsetX, offsetY, scale, pan, zoom } = useViewportStore();
  const { activeTool, drawingColor, lineWidth } = useToolStore();
  const selectCandle = useCandleStore((s) => s.selectCandle);
  const selectDrawing = useDrawingStore((s) => s.selectDrawing);
  const addDrawing = useDrawingStore((s) => s.addDrawing);

  const [drawStart, setDrawStart] = useState<Point | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Point | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setSize({ width: container.clientWidth, height: container.clientHeight });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const getPointerPos = useCallback((): Point | null => {
    const stage = stageRef.current;
    if (!stage) return null;
    const pos = stage.getPointerPosition();
    if (!pos) return null;
    return {
      x: (pos.x - offsetX) / scale,
      y: (pos.y - offsetY) / scale,
    };
  }, [offsetX, offsetY, scale]);

  const handleWheel = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const factor = e.evt.deltaY > 0 ? 0.9 : 1.1;
    const stage = stageRef.current;
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;
    zoom(factor, pos.x, pos.y);
  }, [zoom]);

  const handleMouseDown = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeTool === 'pan' || e.evt.button === 1) {
      setIsPanning(true);
      setPanStart({ x: e.evt.clientX, y: e.evt.clientY });
      return;
    }

    if (activeTool === 'select') {
      const target = e.target;
      if (target === stageRef.current) {
        selectCandle(null);
        selectDrawing(null);
      }
      return;
    }

    const pos = getPointerPos();
    if (!pos) return;

    if (activeTool === 'horizontal') {
      addDrawing({
        id: `draw-${Date.now()}`,
        type: 'horizontal',
        y: pos.y,
        color: drawingColor,
        lineWidth,
        style: 'solid',
      });
      return;
    }

    if (activeTool === 'text') {
      const content = prompt('Text eingeben:');
      if (content) {
        addDrawing({
          id: `draw-${Date.now()}`,
          type: 'text',
          position: pos,
          content,
          color: drawingColor,
          lineWidth,
          fontSize: 14,
        });
      }
      return;
    }

    setDrawStart(pos);
  }, [activeTool, getPointerPos, selectCandle, selectDrawing, addDrawing, drawingColor, lineWidth]);

  const handleMouseMove = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (isPanning && panStart) {
      const dx = e.evt.clientX - panStart.x;
      const dy = e.evt.clientY - panStart.y;
      pan(dx, dy);
      setPanStart({ x: e.evt.clientX, y: e.evt.clientY });
    }
  }, [isPanning, panStart, pan]);

  const handleMouseUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
      setPanStart(null);
      return;
    }

    if (!drawStart) return;
    const pos = getPointerPos();
    if (!pos) { setDrawStart(null); return; }

    const id = `draw-${Date.now()}`;

    switch (activeTool) {
      case 'trendline':
        addDrawing({ id, type: 'trendline', points: [drawStart, pos], color: drawingColor, lineWidth });
        break;
      case 'arrow':
        addDrawing({ id, type: 'arrow', points: [drawStart, pos], color: drawingColor, lineWidth });
        break;
      case 'rectangle':
        addDrawing({
          id, type: 'rectangle',
          x: Math.min(drawStart.x, pos.x),
          y: Math.min(drawStart.y, pos.y),
          width: Math.abs(pos.x - drawStart.x),
          height: Math.abs(pos.y - drawStart.y),
          color: drawingColor, lineWidth, fillOpacity: 0.15,
        });
        break;
      case 'zone': {
        const label = prompt('Zone Label (z.B. FVG, OB):') || 'Zone';
        addDrawing({
          id, type: 'zone',
          x: Math.min(drawStart.x, pos.x),
          y: Math.min(drawStart.y, pos.y),
          width: Math.abs(pos.x - drawStart.x),
          height: Math.abs(pos.y - drawStart.y),
          label, color: drawingColor, lineWidth, fillOpacity: 0.2,
        });
        break;
      }
      case 'fib':
        addDrawing({ id, type: 'fib', highPoint: drawStart, lowPoint: pos, color: drawingColor, lineWidth });
        break;
    }

    setDrawStart(null);
  }, [drawStart, activeTool, getPointerPos, addDrawing, drawingColor, lineWidth, isPanning]);

  const priceToY = useCallback((price: number): number => {
    return size.height - ((price / 200) * size.height);
  }, [size.height]);

  return (
    <div ref={containerRef} className="flex-1 overflow-hidden bg-[#0f1117] relative">
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        offsetX={-offsetX}
        offsetY={-offsetY}
        scaleX={scale}
        scaleY={scale}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: activeTool === 'pan' || isPanning ? 'grab' : 'crosshair' }}
      >
        <Layer>
          <GridLayer width={size.width * 3} height={size.height * 3} />
        </Layer>
        <Layer>
          <CandleLayer height={size.height} priceToY={priceToY} />
        </Layer>
        <Layer>
          <DrawingLayer width={size.width * 3} />
        </Layer>
      </Stage>

      {/* Add Candle Buttons */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        <button
          onClick={() => useCandleStore.getState().addCandle('bullish')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00c087]/20 text-[#00c087] border border-[#00c087]/40 rounded-lg hover:bg-[#00c087]/30 text-sm font-medium transition-colors"
        >
          <span className="text-lg">+</span> Grün
        </button>
        <button
          onClick={() => useCandleStore.getState().addCandle('bearish')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/40 rounded-lg hover:bg-[#ef4444]/30 text-sm font-medium transition-colors"
        >
          <span className="text-lg">+</span> Rot
        </button>
      </div>
    </div>
  );
}
