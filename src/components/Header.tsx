import React, { useState, useEffect } from 'react';
import { AppStep } from '../types';
import { soundFx } from '../lib/soundFx';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Gamepad2, Coins } from 'lucide-react';

interface HeaderProps {
  currentStep: AppStep;
  onStepClick: (step: AppStep) => void;
  onReset: () => void;
  onOpenGuide: () => void;
  selectedPersonaName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onStepClick,
  onReset,
  onOpenGuide,
  selectedPersonaName,
}) => {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [coinCount, setCoinCount] = useState(10);

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      setCoinCount((prev) => prev + 1);
    }
  };

  const steps: { id: AppStep; label: string; world: string; icon: string }[] = [
    { id: 'business-input', label: 'Briefing', world: 'WORLD 1', icon: '📝' },
    { id: 'persona-selection', label: 'Hero Select', world: 'WORLD 2', icon: '👤' },
    { id: 'journey-matrix', label: 'Overworld Map', world: 'WORLD 3', icon: '🗺️' },
  ];

  const getStepStatus = (stepId: AppStep) => {
    const order: AppStep[] = ['business-input', 'persona-selection', 'journey-matrix'];
    const currentIndex = order.indexOf(currentStep);
    const targetIndex = order.indexOf(stepId);

    if (currentIndex === targetIndex) return 'current';
    if (currentIndex > targetIndex) return 'completed';
    return 'upcoming';
  };

  const handleStepClick = (stepId: AppStep) => {
    soundFx.playCoin();
    onStepClick(stepId);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b-4 border-slate-950 text-white shadow-md">
      {/* 8-bit Top Arcade Bar */}
      <div className="bg-slate-950 text-[10px] sm:text-xs font-pixel py-1.5 px-4 text-amber-400 border-b-2 border-slate-800 flex items-center justify-between tracking-wider select-none">
        <div className="flex items-center gap-4">
          <span className="text-rose-500">1UP: <span className="text-white">004200</span></span>
          <span className="hidden sm:inline text-sky-400">STAGE: <span className="text-white">
            {currentStep === 'business-input' ? '1-1' : currentStep === 'persona-selection' ? '1-2' : '1-3 (MAP)'}
          </span></span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              soundFx.playCoin();
              setCoinCount(c => c + 1);
            }}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 cursor-pointer active:scale-95 transition-transform"
            title="Click for a Coin!"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
            <span>x{String(coinCount).padStart(2, '0')}</span>
          </button>
          <span className="hidden sm:inline text-emerald-400">TIME: <span className="text-white">399</span></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Game Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-amber-400 border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-slate-950 font-bold">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs sm:text-sm text-amber-400 tracking-wider">
                  Marketing Journey Map Generator
                </span>
                <span className="hidden md:inline text-[9px] font-pixel text-emerald-400 bg-emerald-950/80 border border-emerald-500/60 px-1.5 py-0.5">
                  8-BIT EDITION
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5 hidden sm:block">
                Strategic Overworld CX Matrix & Persona Simulator
              </p>
            </div>
          </div>

          {/* Stepper Navigation (NES Style Level Select) */}
          <nav className="hidden md:flex items-center gap-2">
            {steps.map((step, idx) => {
              const status = getStepStatus(step.id);
              const isClickable = status === 'completed' || status === 'current';

              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && handleStepClick(step.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-arcade uppercase tracking-wider transition-all nes-btn ${
                      status === 'current'
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-[2px_2px_0px_0px_#000]'
                        : status === 'completed'
                        ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700 cursor-pointer'
                        : 'bg-slate-900/60 text-slate-600 border-slate-800 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span>{step.icon}</span>
                    <span>{step.world}: {step.label}</span>
                    {status === 'completed' && <span className="text-emerald-400 font-bold">★</span>}
                  </button>

                  {idx < steps.length - 1 && (
                    <span className="text-amber-500 font-pixel text-xs select-none">▶</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Retro Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Sound FX Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-arcade font-bold nes-btn cursor-pointer ${
                !isMuted
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
              title={isMuted ? 'Turn Sound FX ON' : 'Turn Sound FX OFF'}
            >
              {!isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SFX ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SFX OFF</span>
                </>
              )}
            </button>

            {/* Guide Button */}
            <button
              type="button"
              onClick={() => {
                soundFx.playCoin();
                onOpenGuide();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-arcade font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 nes-btn cursor-pointer"
              title="Manual & Instructions"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">MANUAL</span>
            </button>

            {/* Reset / New Game Button */}
            <button
              type="button"
              onClick={() => {
                soundFx.playButton();
                onReset();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-arcade font-bold bg-rose-600 hover:bg-rose-500 text-white nes-btn cursor-pointer"
              title="Reset / Start New Game"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RESET</span>
            </button>
          </div>
        </div>

        {/* Mobile Stage Indicator */}
        <div className="md:hidden py-2 border-t border-slate-800 flex items-center justify-between text-xs font-arcade">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-amber-400 text-slate-950 font-bold text-[10px]">
              {currentStep === 'business-input' ? 'W1' : currentStep === 'persona-selection' ? 'W2' : 'W3'}
            </span>
            <span className="text-amber-300 font-bold">
              {currentStep === 'business-input'
                ? 'WORLD 1: BRIEFING'
                : currentStep === 'persona-selection'
                ? 'WORLD 2: HERO SELECT'
                : 'WORLD 3: OVERWORLD MAP'}
            </span>
          </div>
          {selectedPersonaName && currentStep === 'journey-matrix' && (
            <span className="text-emerald-400 text-[11px] truncate max-w-[130px]">
              ★ {selectedPersonaName}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
