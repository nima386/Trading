export interface CandleData {
  id: string;
  index: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function isBullish(candle: CandleData): boolean {
  return candle.close >= candle.open;
}
