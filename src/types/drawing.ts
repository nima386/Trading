export interface Point {
  x: number;
  y: number;
}

export interface BaseDrawing {
  id: string;
  color: string;
  lineWidth: number;
}

export interface TrendLineDrawing extends BaseDrawing {
  type: 'trendline';
  points: [Point, Point];
}

export interface HorizontalLineDrawing extends BaseDrawing {
  type: 'horizontal';
  y: number;
  style: 'solid' | 'dashed';
}

export interface RectangleDrawing extends BaseDrawing {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  fillOpacity: number;
}

export interface ZoneDrawing extends BaseDrawing {
  type: 'zone';
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  fillOpacity: number;
}

export interface FibDrawing extends BaseDrawing {
  type: 'fib';
  highPoint: Point;
  lowPoint: Point;
}

export interface ArrowDrawing extends BaseDrawing {
  type: 'arrow';
  points: [Point, Point];
}

export interface TextDrawing extends BaseDrawing {
  type: 'text';
  position: Point;
  content: string;
  fontSize: number;
}

export type DrawingObject =
  | TrendLineDrawing
  | HorizontalLineDrawing
  | RectangleDrawing
  | ZoneDrawing
  | FibDrawing
  | ArrowDrawing
  | TextDrawing;
