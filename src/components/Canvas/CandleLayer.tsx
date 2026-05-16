import { Group, Rect, Line, Circle } from 'react-konva';
import { useCandleStore } from '../../stores/useCandleStore';
import { isBullish } from '../../types/candle';
import { CANDLE_WIDTH, CANDLE_TOTAL, CANVAS_PADDING, COLORS, HANDLE_RADIUS } from '../../utils/constants';

interface Props {
  height: number;
  priceToY: (price: number) => number;
}

export function CandleLayer({ height, priceToY }: Props) {
  const { candles, selectedCandleId, selectCandle, updateCandle } = useCandleStore();

  return (
    <>
      {candles.map((candle) => {
        const x = CANVAS_PADDING + candle.index * CANDLE_TOTAL;
        const centerX = x + CANDLE_WIDTH / 2;
        const bullish = isBullish(candle);
        const bodyTop = priceToY(Math.max(candle.open, candle.close));
        const bodyBottom = priceToY(Math.min(candle.open, candle.close));
        const bodyHeight = Math.max(bodyBottom - bodyTop, 2);
        const highY = priceToY(candle.high);
        const lowY = priceToY(candle.low);
        const isSelected = selectedCandleId === candle.id;
        const color = bullish ? COLORS.bullish : COLORS.bearish;

        return (
          <Group key={candle.id} onClick={() => selectCandle(candle.id)}>
            {/* Wick */}
            <Line
              points={[centerX, highY, centerX, lowY]}
              stroke={COLORS.wick}
              strokeWidth={1.5}
            />
            {/* Body */}
            <Rect
              x={x}
              y={bodyTop}
              width={CANDLE_WIDTH}
              height={bodyHeight}
              fill={color}
              cornerRadius={2}
              stroke={isSelected ? COLORS.handle : undefined}
              strokeWidth={isSelected ? 1.5 : 0}
            />
            {/* Drag handles when selected */}
            {isSelected && (
              <>
                {/* High handle */}
                <Circle
                  x={centerX}
                  y={highY}
                  radius={HANDLE_RADIUS}
                  fill={COLORS.handle}
                  draggable
                  onDragMove={(e) => {
                    e.target.x(centerX);
                    updateCandle(candle.id, { high: yToPrice(e.target.y(), height) });
                  }}
                />
                {/* Low handle */}
                <Circle
                  x={centerX}
                  y={lowY}
                  radius={HANDLE_RADIUS}
                  fill={COLORS.handle}
                  draggable
                  onDragMove={(e) => {
                    e.target.x(centerX);
                    updateCandle(candle.id, { low: yToPrice(e.target.y(), height) });
                  }}
                />
                {/* Body top handle */}
                <Circle
                  x={centerX}
                  y={bodyTop}
                  radius={HANDLE_RADIUS}
                  fill="#ffffff"
                  draggable
                  onDragMove={(e) => {
                    e.target.x(centerX);
                    const price = yToPrice(e.target.y(), height);
                    if (bullish) {
                      updateCandle(candle.id, { close: price });
                    } else {
                      updateCandle(candle.id, { open: price });
                    }
                  }}
                />
                {/* Body bottom handle */}
                <Circle
                  x={centerX}
                  y={bodyBottom}
                  radius={HANDLE_RADIUS}
                  fill="#ffffff"
                  draggable
                  onDragMove={(e) => {
                    e.target.x(centerX);
                    const price = yToPrice(e.target.y(), height);
                    if (bullish) {
                      updateCandle(candle.id, { open: price });
                    } else {
                      updateCandle(candle.id, { close: price });
                    }
                  }}
                />
              </>
            )}
          </Group>
        );
      })}
    </>
  );
}

function yToPrice(y: number, height: number): number {
  return 200 - (y / height) * 200;
}
