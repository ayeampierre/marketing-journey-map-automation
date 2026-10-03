import React from 'react';
import { soundFx } from '../lib/soundFx';
import { Gamepad2, ArrowRight, Check, X, Lightbulb, Trophy, Sparkles } from 'lucide-react';

interface WelcomeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onTryExample: () => void;
}

export const WelcomeGuide: React.FC<WelcomeGuideProps> = ({
  isOpen,
  onClose,
  onTryExample,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    soundFx.playButton();
    onClose();
  };

  const handleExample = () => {
    soundFx.playCoin();
    onTryExample();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 border-4 border-slate-950 max-w-2xl w-full shadow-[8px_8px_0px_0px_#000] overflow-hidden flex flex-col max-h-[90vh]">
        {/* NES Instruction Booklet Header */}
        <div className="relative bg-slate-950 border-b-4 border-slate-900 text-white p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            aria-label="Close welcome guide"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <span className="p-1.5 bg-amber-400 text-slate-950 border border-black font-bold">
              <Gamepad2 className="w-4 h-4" />
            </span>
            <span className="font-pixel text-[10px] text-amber-400 uppercase tracking-wider">
              OFFICIAL PLAYER'S MANUAL
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-pixel text-amber-400 tracking-wider uppercase leading-snug">
            Marketing Journey Map Generator
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-sans max-w-xl leading-relaxed">
            Welcome, Campaign Strategist! Transform any raw business concept into 3 distinct customer personas,
            select your active champion, and automatically generate an actionable 8-bit Overworld Customer Journey Map.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto font-sans text-slate-200">
          {/* Main Features in 3 Stages */}
          <div>
            <h3 className="font-arcade text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              THE 3-WORLD QUEST PROGRESSION:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* World 1 */}
              <div className="p-4 bg-slate-950 border-2 border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="font-pixel text-[9px] text-amber-400 mb-1 font-bold">WORLD 1</div>
                  <h4 className="font-arcade font-bold text-white text-xs uppercase">Mission Briefing</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Describe your offering in 2–3 sentences and set pricing, market reach, and merchant distribution channel.
                  </p>
                </div>
              </div>

              {/* World 2 */}
              <div className="p-4 bg-slate-950 border-2 border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="font-pixel text-[9px] text-emerald-400 mb-1 font-bold">WORLD 2</div>
                  <h4 className="font-arcade font-bold text-white text-xs uppercase">Hero Select</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Inspect 3 distinct consumer personas with demographics, lifestyle, purchase triggers, and candid quotes. Select one!
                  </p>
                </div>
              </div>

              {/* World 3 */}
              <div className="p-4 bg-slate-950 border-2 border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="font-pixel text-[9px] text-sky-400 mb-1 font-bold">WORLD 3</div>
                  <h4 className="font-arcade font-bold text-white text-xs uppercase">Overworld Map</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Traverse 5 kingdom biomes from Awareness to Advocacy, explicitly tracking 6 core customer and business dimensions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Where to Start Callout */}
          <div className="p-4 bg-slate-950 border-2 border-amber-400/80">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-400 text-slate-950 font-bold shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-arcade text-xs font-bold text-amber-400 uppercase tracking-wide">
                  WHERE TO START:
                </h4>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  Start in <span className="font-bold text-amber-300">WORLD 1</span>. Type your business description into the input box or click a sample cartridge. Pick your pricing, reach, and sales route, then press <span className="font-bold text-amber-300">GENERATE 3 PERSONAS</span>!
                </p>
              </div>
            </div>
          </div>

          {/* 8-bit Features Checklist */}
          <div>
            <h4 className="font-arcade text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              POWER-UPS & GAME FEATURES:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">▶</span>
                <span>Authentic 8-bit coin sound FX and chiptune audio cues</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">▶</span>
                <span>Top-down bird's eye video game overworld map view</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">▶</span>
                <span>Edit any quest dimension in-place for team-specific tailoring</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">▶</span>
                <span>1-Click Export to Markdown (Notion) and CSV (Excel/Sheets)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-7 sm:py-4 bg-slate-950 border-t-4 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleExample}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-700 hover:border-amber-400 font-arcade text-xs font-bold nes-btn cursor-pointer"
          >
            <span>🎮 LOAD SAMPLE CARTRIDGE</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-pixel text-xs font-bold nes-btn cursor-pointer shadow-[2px_2px_0px_0px_#000]"
          >
            <span>START PLAYING</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
