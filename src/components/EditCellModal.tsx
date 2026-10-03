import React, { useState } from 'react';
import { JourneyRowKey, JourneyStageId, JourneyStageData } from '../types';
import { soundFx } from '../lib/soundFx';
import { X, Check, Edit2 } from 'lucide-react';

interface EditCellModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageId: JourneyStageId;
  stageData: JourneyStageData;
  rowKey: JourneyRowKey;
  onSave: (stageId: JourneyStageId, rowKey: JourneyRowKey, newContent: string | string[]) => void;
}

export const EditCellModal: React.FC<EditCellModalProps> = ({
  isOpen,
  onClose,
  stageId,
  stageData,
  rowKey,
  onSave,
}) => {
  if (!isOpen) return null;

  const rowLabels: Record<JourneyRowKey, string> = {
    purchaseOccasion: 'Purchase Occasion',
    customerActivities: 'Customer Activities',
    customerGoals: 'Customer Goals',
    touchpoints: 'Touchpoints',
    painPoints: 'Pain Points',
    businessGoals: 'Business Goals',
  };

  const isArrayField = Array.isArray(stageData[rowKey]);
  const initialValue = isArrayField
    ? (stageData[rowKey] as string[]).join('\n')
    : (stageData[rowKey] as string);

  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    soundFx.playCoin();
    if (isArrayField) {
      const items = value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      onSave(stageId, rowKey, items);
    } else {
      onSave(stageId, rowKey, value.trim());
    }
    onClose();
  };

  const handleCancel = () => {
    soundFx.playButton();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-slate-900 border-4 border-slate-950 max-w-lg w-full shadow-[8px_8px_0px_0px_#000] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b-2 border-slate-800">
          <div>
            <h3 className="font-arcade font-bold text-amber-400 text-sm uppercase tracking-wide">
              Customize Realm Dimension
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              {stageData.title} · <span className="font-bold text-white uppercase">{rowLabels[rowKey]}</span>
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 font-sans">
          <div>
            <label className="block text-xs font-arcade font-bold text-amber-300 uppercase tracking-wide mb-2">
              {rowLabels[rowKey]} Data {isArrayField && '(One item per line)'}
            </label>
            <textarea
              rows={isArrayField ? 6 : 4}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full text-xs font-sans bg-slate-950 text-slate-100 border-2 border-slate-700 p-3 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 leading-relaxed"
              placeholder={isArrayField ? 'Point 1\nPoint 2\nPoint 3' : 'Enter dimension content...'}
            />
          </div>
          {isArrayField && (
            <p className="text-[11px] text-slate-400 font-sans">
              Tip: Press Enter for new lines to output distinct bullet points in the matrix and map.
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-950 border-t-2 border-slate-800 font-arcade">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 nes-btn cursor-pointer"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-950 text-xs font-bold font-pixel nes-btn shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>SAVE TO MAP</span>
          </button>
        </div>
      </div>
    </div>
  );
};
