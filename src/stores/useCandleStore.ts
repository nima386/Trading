import { create } from 'zustand';
import type { CandleData } from '../types/candle';

interface CandleState {
  candles: CandleData[];
  selectedCandleId: string | null;
  addCandle: (type: 'bullish' | 'bearish') => void;
  updateCandle: (id: string, updates: Partial<CandleData>) => void;
  deleteCandle: (id: string) => void;
  selectCandle: (id: string | null) => void;
}

let nextId = 1;

function generateId(): string {
  return `candle-${nextId++}`;
}

export const useCandleStore = create<CandleState>((set, get) => ({
  candles: [],
  selectedCandleId: null,

  addCandle: (type) => {
    const { candles } = get();
    const lastCandle = candles[candles.length - 1];
    const basePrice = lastCandle ? lastCandle.close : 100;

    const bodySize = 8 + Math.random() * 12;
    const wickUp = 3 + Math.random() * 6;
    const wickDown = 3 + Math.random() * 6;

    let open: number, close: number;
    if (type === 'bullish') {
      open = basePrice;
      close = basePrice + bodySize;
    } else {
      open = basePrice;
      close = basePrice - bodySize;
    }

    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDown;

    const newCandle: CandleData = {
      id: generateId(),
      index: candles.length,
      open,
      high,
      low,
      close,
    };

    set({ candles: [...candles, newCandle] });
  },

  updateCandle: (id, updates) => {
    set({
      candles: get().candles.map((c) => {
        if (c.id !== id) return c;
        const updated = { ...c, ...updates };
        updated.high = Math.max(updated.high, Math.max(updated.open, updated.close));
        updated.low = Math.min(updated.low, Math.min(updated.open, updated.close));
        return updated;
      }),
    });
  },

  deleteCandle: (id) => {
    const candles = get().candles.filter((c) => c.id !== id);
    const reindexed = candles.map((c, i) => ({ ...c, index: i }));
    set({ candles: reindexed, selectedCandleId: null });
  },

  selectCandle: (id) => set({ selectedCandleId: id }),
}));
