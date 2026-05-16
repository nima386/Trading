import { useState } from 'react';
import { FileDown, Undo2, Redo2, TrendingUp } from 'lucide-react';
import { ExportModal } from '../UI/ExportModal';

export function TopBar() {
  const [showExport, setShowExport] = useState(false);

  return (
    <>
      <header className="h-12 bg-[#1a1d28] border-b border-[#2a2d3a] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-[#3b82f6]" />
          <span className="text-sm font-semibold text-[#e1e4eb]">Trading Chart Builder</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-[#252836] text-[#8b8fa3] hover:text-[#e1e4eb] transition-colors">
            <Undo2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded hover:bg-[#252836] text-[#8b8fa3] hover:text-[#e1e4eb] transition-colors">
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-[#2a2d3a] mx-2" />
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#3b82f6] text-white text-sm rounded hover:bg-[#2563eb] transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </header>
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </>
  );
}
