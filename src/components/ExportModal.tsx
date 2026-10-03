import React, { useState } from 'react';
import { CustomerJourneyMap, Persona } from '../types';
import { exportMatrixAsCSV, exportMatrixAsMarkdown } from '../lib/templates';
import { soundFx } from '../lib/soundFx';
import { X, Copy, Check, Download, FileText, Table, Code, Gamepad2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  journeyMap: CustomerJourneyMap;
  persona: Persona;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  journeyMap,
  persona,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'markdown' | 'csv' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  const markdownContent = exportMatrixAsMarkdown(journeyMap, persona);
  const csvContent = exportMatrixAsCSV(journeyMap, persona);
  const jsonContent = JSON.stringify({ persona, journeyMap }, null, 2);

  const getContent = () => {
    switch (activeTab) {
      case 'csv':
        return csvContent;
      case 'json':
        return jsonContent;
      case 'markdown':
      default:
        return markdownContent;
    }
  };

  const handleCopy = async () => {
    try {
      soundFx.playLevelUp();
      await navigator.clipboard.writeText(getContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    soundFx.playCoin();
    const content = getContent();
    const extensions = {
      markdown: 'md',
      csv: 'csv',
      json: 'json',
    };
    const mimeTypes = {
      markdown: 'text/markdown',
      csv: 'text/csv',
      json: 'application/json',
    };

    const blob = new Blob([content], { type: mimeTypes[activeTab] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing-journey-map-${persona.name.toLowerCase().replace(/\s+/g, '-')}.${extensions[activeTab]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTabChange = (tab: 'markdown' | 'csv' | 'json') => {
    soundFx.playSelect();
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-slate-900 border-4 border-slate-950 max-w-3xl w-full shadow-[8px_8px_0px_0px_#000] overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b-2 border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-1 bg-amber-400 text-slate-950 font-bold border border-black">
              💾
            </span>
            <div>
              <h3 className="font-arcade font-bold text-white text-sm uppercase tracking-wide">
                Save & Export Campaign Cartridge
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Target Hero: <span className="text-amber-400 font-bold">{persona.name}</span> ({persona.archetypeBadge})
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playButton();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls (8-bit style) */}
        <div className="px-6 pt-3 border-b-2 border-slate-800 flex flex-wrap items-center justify-between bg-slate-950/60 gap-2">
          <div className="flex items-center gap-1 font-arcade">
            <button
              onClick={() => handleTabChange('markdown')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'markdown'
                  ? 'bg-amber-400 text-slate-950 border-t-2 border-x-2 border-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>MARKDOWN (DOCS)</span>
            </button>
            <button
              onClick={() => handleTabChange('csv')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'csv'
                  ? 'bg-amber-400 text-slate-950 border-t-2 border-x-2 border-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>CSV (SHEETS)</span>
            </button>
            <button
              onClick={() => handleTabChange('json')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'json'
                  ? 'bg-amber-400 text-slate-950 border-t-2 border-x-2 border-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>RAW JSON</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2 font-arcade">
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border-2 transition-all nes-btn cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-slate-950 border-white'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-amber-400'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>COPY TO CLIPBOARD</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-950 text-xs font-bold nes-btn cursor-pointer shadow-[2px_2px_0px_0px_#000]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD .{activeTab === 'markdown' ? 'MD' : activeTab.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Code / Content Preview */}
        <div className="p-6 flex-1 overflow-auto bg-slate-950 text-amber-300 font-mono text-xs leading-relaxed selection:bg-amber-400 selection:text-slate-950 border-b-2 border-slate-800">
          <pre className="whitespace-pre-wrap break-all">{getContent()}</pre>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-950 text-xs font-arcade text-slate-400 flex items-center justify-between">
          <span>CHAMPION: {persona.name}</span>
          <span className="text-amber-400">5 OVERWORLD REALMS EXPORTED</span>
        </div>
      </div>
    </div>
  );
};
