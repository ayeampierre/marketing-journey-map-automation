import React from 'react';
import { BusinessProfile, Persona } from '../types';
import { soundFx } from '../lib/soundFx';
import {
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Quote,
  Target,
  Sparkles,
  DollarSign,
  Gamepad,
  Shield,
  Zap,
  Heart,
  Flame,
} from 'lucide-react';

interface PersonaSelectionDashboardProps {
  personas: Persona[];
  businessProfile: BusinessProfile;
  selectedPersona: Persona | null;
  onSelectPersona: (persona: Persona) => void;
  onConfirm: () => void;
  onBackToInput: () => void;
  isGeneratingJourney: boolean;
}

export const PersonaSelectionDashboard: React.FC<PersonaSelectionDashboardProps> = ({
  personas,
  businessProfile,
  selectedPersona,
  onSelectPersona,
  onConfirm,
  onBackToInput,
  isGeneratingJourney,
}) => {
  const activePersona = selectedPersona || personas[0];

  const handleCardClick = (persona: Persona) => {
    soundFx.playCoin();
    onSelectPersona(persona);
  };

  const handleConfirmClick = () => {
    soundFx.playLevelUp();
    onConfirm();
  };

  const handleBackClick = () => {
    soundFx.playButton();
    onBackToInput();
  };

  const getHeroIcon = (color: string) => {
    switch (color) {
      case 'teal':
        return '🧙‍♂️';
      case 'amber':
        return '🧝‍♀️';
      case 'emerald':
        return '🏹';
      case 'blue':
        return '🛡️';
      case 'rose':
        return '✨';
      case 'indigo':
      default:
        return '⚔️';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 font-pixel text-[10px] mb-2 border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">
              <Users className="w-3.5 h-3.5" />
              <span>WORLD 2: CHARACTER SELECT SCREEN</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-pixel text-amber-400 tracking-wider uppercase leading-tight drop-shadow-[2px_2px_0px_#000]">
              Choose Your Target Champion
            </h1>
            <p className="mt-2 text-sm text-slate-200 font-sans">
              Select one anchor persona to traverse the 5-stage Overworld Customer Journey Map.
            </p>
          </div>

          <button
            type="button"
            onClick={handleBackClick}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-2 text-xs font-arcade font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-amber-400 nes-btn cursor-pointer"
          >
            <span>◀ EDIT MISSION BRIEF</span>
          </button>
        </div>

        {/* Business Summary Bar */}
        <div className="mt-4 p-3.5 bg-slate-900 border-2 border-slate-800 text-xs font-sans text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[3px_3px_0px_0px_#000]">
          <div className="flex items-center gap-2">
            <span className="font-arcade text-amber-400 shrink-0 font-bold">QUEST OBJECTIVE:</span>
            <span className="line-clamp-1 italic text-slate-200">"{businessProfile.description}"</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-arcade text-slate-400 shrink-0">
            <span className="text-amber-300 uppercase">TIER: {businessProfile.pricingTier}</span>
            <span>·</span>
            <span className="text-sky-300 uppercase">REACH: {businessProfile.marketReach}</span>
            <span>·</span>
            <span className="text-emerald-300 uppercase">ROUTE: {businessProfile.distributionChannel.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      {/* 3 Character Select Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {personas.map((persona, index) => {
          const isSelected = activePersona?.id === persona.id;

          return (
            <div
              key={persona.id || index}
              onClick={() => handleCardClick(persona)}
              className={`relative flex flex-col border-4 transition-all cursor-pointer text-left ${
                isSelected
                  ? 'bg-slate-900 border-amber-400 shadow-[6px_6px_0px_0px_#000] scale-[1.02] ring-2 ring-amber-400/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-600 hover:bg-slate-900 shadow-[4px_4px_0px_0px_#000]'
              }`}
            >
              {/* Selected Banner */}
              {isSelected && (
                <div className="bg-amber-400 text-slate-950 font-pixel text-[10px] text-center py-1 font-bold tracking-wider border-b-2 border-slate-950">
                  ★ SELECTED CHAMPION ★
                </div>
              )}

              {/* Card Header & Avatar */}
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-slate-950 border-2 border-amber-400/80 shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-2xl shrink-0">
                      <span>{getHeroIcon(persona.avatarColor)}</span>
                    </div>
                    <div>
                      <span className="font-pixel text-[9px] text-amber-500 font-bold block">
                        PLAYER {index + 1}
                      </span>
                      <h2 className="text-base font-arcade font-bold text-white uppercase tracking-wider leading-tight mt-0.5">
                        {persona.name}
                      </h2>
                      <p className="text-xs font-sans text-slate-300 font-medium">
                        {persona.title}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <div
                      className={`w-7 h-7 border-2 flex items-center justify-center font-bold text-xs ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-white'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </div>
                  </div>
                </div>

                {/* Class & Archetype Tag */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-arcade text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/50 px-2 py-0.5">
                    CLASS: {persona.archetypeBadge}
                  </span>
                </div>

                {/* RPG Stat Meters */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-arcade text-slate-400 bg-slate-950 p-2 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-rose-400 flex items-center gap-1"><Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> HP:</span>
                    <span className="text-white font-bold">100/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sky-400 flex items-center gap-1"><Zap className="w-3 h-3 fill-sky-400 text-sky-400" /> MP:</span>
                    <span className="text-white font-bold">85/100</span>
                  </div>
                </div>
              </div>

              {/* Character Quote Box */}
              <div className="px-5 py-3 bg-slate-950 border-y-2 border-slate-800 flex items-start gap-2">
                <span className="text-amber-400 font-pixel text-sm shrink-0">“</span>
                <p className="text-xs font-sans text-amber-200 italic leading-relaxed">
                  {persona.quote}
                </p>
              </div>

              {/* Details & Specs in Crisp, High-Contrast Typography */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between font-sans">
                <div>
                  <div className="text-[10px] font-arcade font-bold uppercase tracking-wider text-amber-400 mb-2">
                    CHARACTER ATTRIBUTES:
                  </div>
                  <dl className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs bg-slate-950/60 p-2.5 border border-slate-800">
                    <div>
                      <dt className="text-slate-400 text-[10px] uppercase font-arcade">Age Bracket</dt>
                      <dd className="font-bold text-slate-100">{persona.demographics.age}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 text-[10px] uppercase font-arcade">Primary Role</dt>
                      <dd className="font-bold text-slate-100 truncate" title={persona.demographics.role}>
                        {persona.demographics.role}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 text-[10px] uppercase font-arcade">Gold / Budget</dt>
                      <dd className="font-bold text-slate-100">{persona.demographics.incomeLevel}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 text-[10px] uppercase font-arcade">Realm Location</dt>
                      <dd className="font-bold text-slate-100 truncate" title={persona.demographics.location}>
                        {persona.demographics.location}
                      </dd>
                    </div>
                  </dl>

                  {/* Purchase Catalyst / Trigger */}
                  <div className="mt-3.5 p-3 bg-amber-950/40 border border-amber-500/40">
                    <div className="flex items-center gap-1.5 text-xs font-arcade font-bold text-amber-300 mb-1">
                      <Target className="w-3.5 h-3.5 text-amber-400" />
                      <span>PURCHASE TRIGGER & CATALYST:</span>
                    </div>
                    <p className="text-xs text-amber-100 font-medium leading-relaxed">
                      {persona.purchaseOccasion}
                    </p>
                  </div>

                  {/* Core Motivations */}
                  <div className="mt-3.5">
                    <div className="text-[10px] font-arcade font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                      ⚔️ CORE QUEST GOALS
                    </div>
                    <ul className="space-y-1 text-xs text-slate-200">
                      {persona.coreMotivations.map((motivation, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold shrink-0">▶</span>
                          <span className="leading-snug">{motivation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Frustrations & Monsters */}
                  <div className="mt-3">
                    <div className="text-[10px] font-arcade font-bold uppercase tracking-wider text-rose-400 mb-1.5">
                      ⚠️ BOSS VULNERABILITIES & OBJECTIONS
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {persona.frustrations.map((frustration, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold shrink-0">×</span>
                          <span className="leading-snug">{frustration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer price / action */}
                <div className="pt-3 border-t-2 border-slate-800 flex items-center justify-between text-xs font-arcade">
                  <span className="text-amber-300 font-bold truncate max-w-[170px]">
                    🪙 {persona.willingnessToPay}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(persona);
                    }}
                    className={`px-3 py-1 font-arcade text-xs font-bold nes-btn cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {isSelected ? '★ ACTIVE' : 'SELECT'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Arcade Action Bar */}
      <div className="sticky bottom-4 z-30 bg-slate-950 text-white border-4 border-slate-800 shadow-[6px_6px_0px_0px_#000] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 text-slate-950 font-bold text-xl flex items-center justify-center border-2 border-black shrink-0">
            {getHeroIcon(activePersona.avatarColor)}
          </div>
          <div>
            <div className="text-xs font-arcade text-amber-400 uppercase tracking-wider">
              READY PLAYER ONE:
            </div>
            <div className="font-arcade font-bold text-sm sm:text-base text-white uppercase tracking-wide">
              {activePersona.name} · <span className="text-slate-300 font-sans font-normal text-xs">{activePersona.title}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleBackClick}
            className="px-4 py-2.5 text-xs font-arcade text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 nes-btn cursor-pointer"
          >
            ◀ BACK
          </button>

          <button
            type="button"
            disabled={isGeneratingJourney}
            onClick={handleConfirmClick}
            className={`inline-flex items-center gap-2.5 px-6 py-3 font-pixel text-xs text-slate-950 transition-all nes-btn cursor-pointer ${
              isGeneratingJourney
                ? 'bg-amber-300 opacity-60 cursor-not-allowed'
                : 'bg-amber-400 hover:bg-amber-300 border-slate-950 shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1'
            }`}
          >
            {isGeneratingJourney ? (
              <>
                <span className="inline-block animate-spin">🪙</span>
                <span>RENDERING OVERWORLD MAP...</span>
              </>
            ) : (
              <>
                <span>ENTER OVERWORLD MAP</span>
                <span>▶</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
