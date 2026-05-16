import { Line } from 'react-konva';
import { GRID_SPACING, COLORS } from '../../utils/constants';

interface Props {
  width: number;
  height: number;
}

export function GridLayer({ width, height }: Props) {
  const lines = [];

  for (let x = 0; x < width; x += GRID_SPACING) {
    lines.push(
      <Line
        key={`v-${x}`}
        points={[x, 0, x, height]}
        stroke={COLORS.grid}
        strokeWidth={0.5}
      />
    );
  }

  for (let y = 0; y < height; y += GRID_SPACING) {
    lines.push(
      <Line
        key={`h-${y}`}
        points={[0, y, width, y]}
        stroke={COLORS.grid}
        strokeWidth={0.5}
      />
    );
  }

  return <>{lines}</>;
}
