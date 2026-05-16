import {
  MousePointer2,
  Hand,
  TrendingUp,
  Minus,
  MoveRight,
  Square,
  Layers,
  GitBranch,
  Type,
} from 'lucide-react';
import { useToolStore } from '../../stores/useToolStore';
import type { ToolType } from '../../types/tool';

interface ToolDef {
  type: ToolType;
  icon: React.ReactNode;
  label: string;
}

const tools: ToolDef[] = [
  { type: 'select', icon: <MousePointer2 className="w-4 h-4" />, label: 'Auswählen' },
  { type: 'pan', icon: <Hand className="w-4 h-4" />, label: 'Verschieben' },
  { type: 'trendline', icon: <TrendingUp className="w-4 h-4" />, label: 'Trendlinie' },
  { type: 'horizontal', icon: <Minus className="w-4 h-4" />, label: 'Horizontale Linie' },
  { type: 'arrow', icon: <MoveRight className="w-4 h-4" />, label: 'Pfeil' },
  { type: 'rectangle', icon: <Square className="w-4 h-4" />, label: 'Rechteck' },
  { type: 'zone', icon: <Layers className="w-4 h-4" />, label: 'Zone (FVG/OB)' },
  { type: 'fib', icon: <GitBranch className="w-4 h-4" />, label: 'Fibonacci' },
  { type: 'text', icon: <Type className="w-4 h-4" />, label: 'Text' },
];

export function Toolbar() {
  const { activeTool, setTool } = useToolStore();

  return (
    <div className="w-12 bg-[#1a1d28] border-r border-[#2a2d3a] flex flex-col items-center py-3 gap-1">
      {tools.map((tool) => (
        <button
          key={tool.type}
          onClick={() => setTool(tool.type)}
          title={tool.label}
          className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${
            activeTool === tool.type
              ? 'bg-[#3b82f6]/20 text-[#3b82f6] border-l-2 border-[#3b82f6]'
              : 'text-[#8b8fa3] hover:bg-[#252836] hover:text-[#e1e4eb]'
          }`}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
}
