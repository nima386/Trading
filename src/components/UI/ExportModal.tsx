import { useState } from 'react';
import { X } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Props {
  onClose: () => void;
}

export function ExportModal({ onClose }: Props) {
  const [title, setTitle] = useState('Trading Chart');

  const handleExport = () => {
    const stage = document.querySelector('canvas');
    if (!stage) return;

    const dataUrl = stage.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    pdf.setFontSize(16);
    pdf.text(title, 15, 15);

    const imgWidth = 277;
    const imgHeight = 170;
    pdf.addImage(dataUrl, 'PNG', 10, 22, imgWidth, imgHeight);

    pdf.save(`${title}.pdf`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a1d28] border border-[#2a2d3a] rounded-xl p-6 w-80 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#e1e4eb]">Als PDF exportieren</h2>
          <button onClick={onClose} className="text-[#8b8fa3] hover:text-[#e1e4eb]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <label className="block mb-4">
          <span className="text-xs text-[#8b8fa3]">Titel</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full bg-[#252836] border border-[#2a2d3a] rounded-lg px-3 py-2 text-sm text-[#e1e4eb] focus:outline-none focus:border-[#3b82f6]"
            autoFocus
          />
        </label>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-[#8b8fa3] hover:text-[#e1e4eb] transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-1.5 text-sm bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
          >
            Exportieren
          </button>
        </div>
      </div>
    </div>
  );
}
