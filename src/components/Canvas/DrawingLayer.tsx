import { Line, Rect, Arrow, Text, Group } from 'react-konva';
import { useDrawingStore } from '../../stores/useDrawingStore';
import { FIB_LEVELS } from '../../utils/constants';
import type { DrawingObject } from '../../types/drawing';

interface Props {
  width: number;
}

export function DrawingLayer({ width }: Props) {
  const { drawings, selectedDrawingId, selectDrawing } = useDrawingStore();

  return (
    <>
      {drawings.map((drawing) => {
        const isSelected = selectedDrawingId === drawing.id;
        return (
          <Group key={drawing.id} onClick={() => selectDrawing(drawing.id)}>
            {renderDrawing(drawing, isSelected, width)}
          </Group>
        );
      })}
    </>
  );
}

function renderDrawing(d: DrawingObject, isSelected: boolean, stageWidth: number) {
  const strokeWidth = isSelected ? d.lineWidth + 1 : d.lineWidth;

  switch (d.type) {
    case 'trendline':
      return (
        <Line
          points={[d.points[0].x, d.points[0].y, d.points[1].x, d.points[1].y]}
          stroke={d.color}
          strokeWidth={strokeWidth}
          hitStrokeWidth={10}
        />
      );

    case 'horizontal':
      return (
        <Line
          points={[0, d.y, stageWidth, d.y]}
          stroke={d.color}
          strokeWidth={strokeWidth}
          dash={d.style === 'dashed' ? [8, 4] : undefined}
          hitStrokeWidth={10}
        />
      );

    case 'rectangle':
      return (
        <Rect
          x={d.x}
          y={d.y}
          width={d.width}
          height={d.height}
          stroke={d.color}
          strokeWidth={strokeWidth}
          fill={d.color}
          opacity={d.fillOpacity}
        />
      );

    case 'zone':
      return (
        <>
          <Rect
            x={d.x}
            y={d.y}
            width={d.width}
            height={d.height}
            fill={d.color}
            opacity={d.fillOpacity}
            stroke={d.color}
            strokeWidth={1}
          />
          <Text
            x={d.x + 4}
            y={d.y + 4}
            text={d.label}
            fill={d.color}
            fontSize={11}
            fontStyle="bold"
          />
        </>
      );

    case 'fib': {
      const { highPoint, lowPoint } = d;
      const elements = [];
      for (const level of FIB_LEVELS) {
        const y = highPoint.y + (lowPoint.y - highPoint.y) * level;
        elements.push(
          <Line
            key={`fib-${level}`}
            points={[highPoint.x - 50, y, lowPoint.x + 50, y]}
            stroke={d.color}
            strokeWidth={1}
            dash={[4, 2]}
          />
        );
        elements.push(
          <Text
            key={`fib-label-${level}`}
            x={lowPoint.x + 55}
            y={y - 6}
            text={`${(level * 100).toFixed(1)}%`}
            fill={d.color}
            fontSize={10}
          />
        );
      }
      return <>{elements}</>;
    }

    case 'arrow':
      return (
        <Arrow
          points={[d.points[0].x, d.points[0].y, d.points[1].x, d.points[1].y]}
          stroke={d.color}
          fill={d.color}
          strokeWidth={strokeWidth}
          pointerLength={10}
          pointerWidth={8}
          hitStrokeWidth={10}
        />
      );

    case 'text':
      return (
        <Text
          x={d.position.x}
          y={d.position.y}
          text={d.content}
          fill={d.color}
          fontSize={d.fontSize}
          draggable
        />
      );
  }
}
