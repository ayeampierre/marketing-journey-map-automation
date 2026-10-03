import React, { useState } from 'react';
import { CustomerJourneyMap, JourneyRowKey, JourneyStageId, Persona } from '../types';
import { soundFx } from '../lib/soundFx';
import {
  Share2,
  Copy,
  RotateCcw,
  Users,
  Printer,
  Edit3,
  MapPin,
  CheckCircle2,
  Flag,
  Sparkles,
  Compass,
  Trophy,
  ChevronRight,
  Eye,
  Table,
  Map as MapIcon,
  HelpCircle,
} from 'lucide-react';
import { ExportModal } from './ExportModal';
import { EditCellModal } from './EditCellModal';

interface CustomerJourneyMapMatrixProps {
  journeyMap: CustomerJourneyMap;
  persona: Persona;
  onReset: () => void;
  onSwitchPersona: () => void;
  onUpdateJourneyMap: (updated: CustomerJourneyMap) => void;
}

interface BiomeTheme {
  id: JourneyStageId;
  name: string;
  zoneTitle: string;
  landscapeEmoji: string;
  cardColor: string;
  nodeBg: string;
  borderColor: string;
  badgeBg: string;
  bannerTitle: string;
  soundName: string;
}

const BIOMES: Record<JourneyStageId, BiomeTheme> = {
  awareness: {
    id: 'awareness',
    name: 'Zone 1: Awareness',
    zoneTitle: 'The Green Plains of Discovery',
    landscapeEmoji: '🌱',
    cardColor: 'bg-emerald-950/80',
    nodeBg: 'bg-emerald-500',
    borderColor: 'border-emerald-500',
    badgeBg: 'bg-emerald-400 text-slate-950',
    bannerTitle: 'WORLD 1-1: DISCOVERY WATCHTOWER',
    soundName: 'Grassland Breeze',
  },
  consideration: {
    id: 'consideration',
    name: 'Zone 2: Consideration',
    zoneTitle: 'The Enchanted Forest of Evaluation',
    landscapeEmoji: '🌲',
    cardColor: 'bg-sky-950/80',
    nodeBg: 'bg-sky-500',
    borderColor: 'border-sky-500',
    badgeBg: 'bg-sky-400 text-slate-950',
    bannerTitle: 'WORLD 1-2: CROSSROADS SHRINE',
    soundName: 'Forest Echo',
  },
  convert: {
    id: 'convert',
    name: 'Zone 3: Convert',
    zoneTitle: 'The Golden Citadel of Decision',
    landscapeEmoji: '🏰',
    cardColor: 'bg-amber-950/80',
    nodeBg: 'bg-amber-400',
    borderColor: 'border-amber-400',
    badgeBg: 'bg-amber-400 text-slate-950',
    bannerTitle: 'WORLD 1-3: MERCHANT FORTRESS & VAULT',
    soundName: 'Citadel Gates',
  },
  loyalty: {
    id: 'loyalty',
    name: 'Zone 4: Loyalty',
    zoneTitle: 'The Royal Harbor of Habituation',
    landscapeEmoji: '⚓',
    cardColor: 'bg-indigo-950/80',
    nodeBg: 'bg-indigo-500',
    borderColor: 'border-indigo-500',
    badgeBg: 'bg-indigo-400 text-slate-950',
    bannerTitle: 'WORLD 1-4: LIGHTHOUSE & GUILD HALL',
    soundName: 'Harbor Bell',
  },
  advocacy: {
    id: 'advocacy',
    name: 'Zone 5: Advocacy',
    zoneTitle: 'The Starlight Summit of Evangelism',
    landscapeEmoji: '⭐',
    cardColor: 'bg-purple-950/80',
    nodeBg: 'bg-purple-500',
    borderColor: 'border-purple-400',
    badgeBg: 'bg-purple-400 text-slate-950',
    bannerTitle: 'WORLD 1-5: VICTORY FLAGPOLE & BEACON',
    soundName: 'Summit Fanfare',
  },
};

export const CustomerJourneyMapMatrix: React.FC<CustomerJourneyMapMatrixProps> = ({
  journeyMap,
  persona,
  onReset,
  onSwitchPersona,
  onUpdateJourneyMap,
}) => {
  const [viewMode, setViewMode] = useState<'overworld' | 'matrix'>('overworld');
  const [activeStageId, setActiveStageId] = useState<JourneyStageId>('awareness');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [editState, setEditState] = useState<{
    isOpen: boolean;
    stageId: JourneyStageId;
    rowKey: JourneyRowKey;
  } | null>(null);

  const [copiedNotification, setCopiedNotification] = useState(false);

  const stageKeys: JourneyStageId[] = ['awareness', 'consideration', 'convert', 'loyalty', 'advocacy'];

  const rows: {
    key: JourneyRowKey;
    label: string;
    description: string;
    icon: string;
  }[] = [
    {
      key: 'purchaseOccasion',
      label: 'Purchase Occasion',
      description: 'Buying trigger, urgency catalyst, or purchasing moment',
      icon: '🎯',
    },
    {
      key: 'customerActivities',
      label: 'Customer Activities',
      description: 'Actions, quests, and routines executed by the player',
      icon: '⚡',
    },
    {
      key: 'customerGoals',
      label: 'Customer Goals',
      description: 'Desired outcomes and what they strive to conquer',
      icon: '🏆',
    },
    {
      key: 'touchpoints',
      label: 'Touchpoints',
      description: 'Channels, portals, devices, and merchant environments',
      icon: '📱',
    },
    {
      key: 'painPoints',
      label: 'Pain Points',
      description: 'Obstacles, traps, fears, doubts, and friction points',
      icon: '⚠️',
    },
    {
      key: 'businessGoals',
      label: 'Business Goals',
      description: 'Strategic organizational milestones and growth targets',
      icon: '📈',
    },
  ];

  const handleStageSelect = (stageId: JourneyStageId) => {
    soundFx.playCoin();
    setActiveStageId(stageId);
  };

  const handleCellEdit = (stageId: JourneyStageId, rowKey: JourneyRowKey) => {
    soundFx.playSelect();
    setEditState({
      isOpen: true,
      stageId,
      rowKey,
    });
  };

  const handleSaveCellContent = (
    stageId: JourneyStageId,
    rowKey: JourneyRowKey,
    newContent: string | string[]
  ) => {
    soundFx.playCoin();
    const updatedStages = { ...journeyMap.stages };
    updatedStages[stageId] = {
      ...updatedStages[stageId],
      [rowKey]: newContent,
    };
    onUpdateJourneyMap({
      ...journeyMap,
      stages: updatedStages,
    });
  };

  const handleQuickCopy = async () => {
    try {
      soundFx.playLevelUp();
      const summaryText = `Marketing Journey Map for ${persona.name} (${persona.title})\n\n` +
        stageKeys.map(k => {
          const s = journeyMap.stages[k];
          return `[${s.title}]\n- Purchase Occasion: ${s.purchaseOccasion}\n- Activities: ${s.customerActivities.join('; ')}\n- Goals: ${s.customerGoals.join('; ')}\n- Touchpoints: ${s.touchpoints.join('; ')}\n- Pain Points: ${s.painPoints.join('; ')}\n- Business Goals: ${s.businessGoals.join('; ')}\n- KPI: ${s.keyMetric}`;
        }).join('\n\n');

      await navigator.clipboard.writeText(summaryText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleView = (mode: 'overworld' | 'matrix') => {
    soundFx.playWarp();
    setViewMode(mode);
  };

  const activeStage = journeyMap.stages[activeStageId];
  const activeBiome = BIOMES[activeStageId];

  return (
    <div className="max-w-[1600px] mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top HUD: Hero & Mission Control */}
      <div className="bg-slate-900 border-4 border-slate-950 p-5 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-amber-400 text-slate-950 font-bold text-2xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000] shrink-0">
              👑
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-pixel text-[10px] text-amber-500 font-bold uppercase">
                  ACTIVE CAMPAIGN:
                </span>
                <h1 className="text-lg sm:text-2xl font-arcade font-bold text-white uppercase tracking-wider">
                  {persona.name}
                </h1>
                <span className="font-arcade text-[10px] font-bold text-amber-400 bg-amber-950 border border-amber-500/60 px-2 py-0.5">
                  {persona.archetypeBadge}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                {persona.title} · {persona.demographics.age} · {persona.demographics.role} · {persona.demographics.location}
              </p>
              <div className="mt-1 text-xs text-amber-200 font-sans italic flex items-center gap-1.5">
                <span>“{persona.quote}”</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-arcade">
            {/* View Mode Toggle */}
            <div className="bg-slate-950 p-1 border-2 border-slate-800 flex items-center text-xs">
              <button
                type="button"
                onClick={() => handleToggleView('overworld')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-bold transition-all cursor-pointer ${
                  viewMode === 'overworld'
                    ? 'bg-amber-400 text-slate-950 shadow-[2px_2px_0px_0px_#000]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>OVERWORLD MAP</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleView('matrix')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-bold transition-all cursor-pointer ${
                  viewMode === 'matrix'
                    ? 'bg-amber-400 text-slate-950 shadow-[2px_2px_0px_0px_#000]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>QUEST MATRIX</span>
              </button>
            </div>

            {/* Quick Copy Button */}
            <button
              type="button"
              onClick={handleQuickCopy}
              className={`inline-flex items-center gap-1.5 px-3 py-2 border-2 text-xs font-bold transition-colors nes-btn cursor-pointer ${
                copiedNotification
                  ? 'bg-emerald-500 text-slate-950 border-white'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-amber-400'
              }`}
              title="Copy Quest Log to Clipboard"
            >
              {copiedNotification ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>COPY LOG</span>
                </>
              )}
            </button>

            {/* Export & Share Button */}
            <button
              type="button"
              onClick={() => {
                soundFx.playCoin();
                setIsExportOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-950 font-pixel text-[11px] shadow-[2px_2px_0px_0px_#000] nes-btn cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>EXPORT CARTRIDGE</span>
            </button>

            {/* Switch Persona */}
            <button
              type="button"
              onClick={() => {
                soundFx.playButton();
                onSwitchPersona();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-700 text-xs nes-btn cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span>SWITCH HERO</span>
            </button>

            {/* Print */}
            <button
              type="button"
              onClick={() => {
                soundFx.playButton();
                window.print();
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-700 text-xs nes-btn cursor-pointer"
              title="Print Quest Map"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: BIRD'S EYE VIDEO GAME OVERWORLD MAP */}
      {viewMode === 'overworld' && (
        <div className="space-y-6">
          {/* Overworld Map Canvas Container (Top-Down Bird's Eye Game Map) */}
          <div className="relative overworld-terrain-bg border-4 border-slate-950 rounded-none p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] overflow-hidden">
            {/* Map Header Compass & Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-emerald-900/60 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-lg">
                  🧭
                </div>
                <div>
                  <div className="font-pixel text-[10px] text-amber-400 uppercase tracking-wider">
                    BIRD'S EYE OVERWORLD MAP
                  </div>
                  <h2 className="font-arcade text-lg sm:text-xl font-bold text-white tracking-wide">
                    The 5 Realms of Customer Conversion
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 px-3 py-1.5 text-xs font-arcade text-slate-300">
                <span className="text-amber-400 animate-pulse">▶</span>
                <span>CLICK ANY KINGDOM TO INSPECT QUEST STAGE</span>
              </div>
            </div>

            {/* The Winding Overworld Path (Bird's Eye Stage Nodes) */}
            <div className="py-8 relative">
              {/* Pixel path connector line behind nodes */}
              <div className="hidden md:block absolute top-1/2 left-8 right-8 h-4 -translate-y-1/2 bg-[#5c4033] border-y-2 border-black z-0 pointer-events-none opacity-90"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(90deg, #8B5A2B 0, #8B5A2B 12px, #5c4033 12px, #5c4033 24px)',
                   }}
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                {stageKeys.map((stageKey, idx) => {
                  const stage = journeyMap.stages[stageKey];
                  const biome = BIOMES[stageKey];
                  const isActive = activeStageId === stageKey;

                  return (
                    <div
                      key={stageKey}
                      onClick={() => handleStageSelect(stageKey)}
                      className={`relative flex flex-col p-4 border-4 transition-all cursor-pointer text-left ${
                        isActive
                          ? 'bg-slate-900 border-amber-400 shadow-[6px_6px_0px_0px_#000] scale-[1.04] ring-2 ring-amber-400'
                          : 'bg-slate-950/90 border-slate-900 hover:border-amber-400/70 hover:bg-slate-900 shadow-[4px_4px_0px_0px_#000]'
                      }`}
                    >
                      {/* Active Hero Marker */}
                      {isActive && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-pixel text-[9px] px-2 py-0.5 border-2 border-black font-bold whitespace-nowrap animate-bounce shadow-sm">
                          👤 HERO HERE
                        </div>
                      )}

                      {/* Stage Node Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-pixel text-[9px] text-amber-400 font-bold">
                          LEVEL {idx + 1}
                        </span>
                        <span className="text-xl">{biome.landscapeEmoji}</span>
                      </div>

                      {/* Stage Title */}
                      <h3 className="font-arcade text-sm font-bold text-white uppercase tracking-wider leading-snug">
                        {stage.title}
                      </h3>
                      <p className="text-[11px] font-sans text-slate-300 mt-1 leading-snug line-clamp-1">
                        {biome.zoneTitle}
                      </p>

                      {/* Emotion & Sentiment Badge */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-arcade">
                        <span className="text-slate-400 capitalize">{stage.sentiment}</span>
                        <span className="text-amber-400 font-bold">★ {stage.sentimentScore}/5</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Overworld Map Terrain Accents (Decorative 8-bit bushes, signposts, mountains) */}
            <div className="pt-4 border-t-2 border-emerald-900/60 flex flex-wrap items-center justify-between text-xs font-arcade text-emerald-300/80 gap-2">
              <div className="flex items-center gap-3">
                <span>🌲 Ancient Pines</span>
                <span>·</span>
                <span>🏰 Citadel Gates</span>
                <span>·</span>
                <span>⚓ Harbor Port</span>
                <span>·</span>
                <span>⛰️ Summit Peak</span>
              </div>
              <div className="text-amber-400 font-bold">
                QUEST TRACKER: 5 OF 5 STAGES UNLOCKED
              </div>
            </div>
          </div>

          {/* Active Kingdom Spotlight Panel (Clear, Understandable 6-Row Breakdown) */}
          <div className="bg-slate-900 border-4 border-slate-950 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] space-y-6">
            {/* Kingdom Banner Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-800 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-400 text-slate-950 font-pixel text-[9px] mb-2 border border-black">
                  <span>{activeBiome.landscapeEmoji}</span>
                  <span>{activeBiome.bannerTitle}</span>
                </div>
                <h2 className="font-arcade text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                  {activeStage.title}: {activeStage.subtitle}
                </h2>
                <p className="text-xs text-slate-300 font-sans mt-1">
                  Active exploration zone for <span className="font-bold text-amber-300">{persona.name}</span> ({persona.archetypeBadge})
                </p>
              </div>

              <div className="flex items-center gap-3 font-arcade text-xs">
                <span className="text-slate-400">PLAYER EMOTION:</span>
                <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold border border-black uppercase">
                  {activeStage.sentiment} ({activeStage.sentimentScore}/5)
                </span>
              </div>
            </div>

            {/* The 6 Explicit Required Dimensions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rows.map((row) => {
                const cellData = activeStage[row.key];
                return (
                  <div
                    key={row.key}
                    className="p-5 bg-slate-950 border-2 border-slate-800 hover:border-amber-400/80 transition-all flex flex-col justify-between relative group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{row.icon}</span>
                          <span className="font-arcade text-xs font-bold text-amber-400 uppercase tracking-wide">
                            {row.label}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCellEdit(activeStageId, row.key)}
                          className="p-1 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                          title={`Edit ${row.label}`}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] font-sans text-slate-400 mb-3 leading-snug">
                        {row.description}
                      </p>

                      {/* Cell Content: High clarity, readable body text */}
                      {Array.isArray(cellData) ? (
                        <ul className="space-y-2 text-xs font-sans text-slate-200">
                          {cellData.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 leading-relaxed">
                              <span className="text-amber-400 font-bold shrink-0">▶</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs font-sans text-slate-100 font-medium leading-relaxed">
                          {cellData}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handleCellEdit(activeStageId, row.key)}
                        className="text-[10px] font-arcade text-slate-400 hover:text-amber-300 cursor-pointer"
                      >
                        [ EDIT ATTRIBUTE ]
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strategic KPI & CX Opportunity Footers */}
            <div className="pt-6 border-t-2 border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-950/60 border-2 border-emerald-500/50">
                <div className="font-arcade text-xs font-bold text-emerald-400 flex items-center gap-2 mb-1.5 uppercase">
                  <span>📊</span>
                  <span>STAGE VICTORY METRIC (KPI):</span>
                </div>
                <div className="text-xs font-sans text-emerald-100 font-medium leading-relaxed">
                  {activeStage.keyMetric}
                </div>
              </div>

              <div className="p-4 bg-amber-950/60 border-2 border-amber-500/50">
                <div className="font-arcade text-xs font-bold text-amber-400 flex items-center gap-2 mb-1.5 uppercase">
                  <span>💡</span>
                  <span>STRATEGIC CX OPPORTUNITY & POWER-UP:</span>
                </div>
                <div className="text-xs font-sans text-amber-100 font-medium leading-relaxed">
                  {activeStage.strategicOpportunity}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FULL TACTICAL QUEST MATRIX TABLE */}
      {viewMode === 'matrix' && (
        <div className="bg-slate-900 border-4 border-slate-950 shadow-[6px_6px_0px_0px_#000] overflow-hidden">
          <div className="p-4 bg-slate-950 border-b-2 border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-amber-400" />
              <span className="font-arcade text-xs font-bold text-white uppercase tracking-wider">
                Tactical 5-Stage x 6-Row Quest Matrix Table
              </span>
            </div>
            <span className="font-arcade text-xs text-amber-400">
              CLICK ANY CELL ICON TO CUSTOMIZE
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[1100px]">
              <thead>
                <tr className="bg-slate-950 text-white border-b-2 border-slate-800 font-arcade">
                  <th className="p-4 w-56 text-xs uppercase tracking-wider text-amber-400 border-r-2 border-slate-800 sticky left-0 z-20 bg-slate-950">
                    STAGE DIMENSION
                  </th>
                  {stageKeys.map((stageKey, idx) => {
                    const stage = journeyMap.stages[stageKey];
                    const biome = BIOMES[stageKey];
                    return (
                      <th
                        key={stageKey}
                        className="p-4 w-1/5 min-w-[210px] border-r-2 border-slate-800 last:border-r-0 align-top"
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-white tracking-wide">
                            {stage.title}
                          </span>
                          <span className="text-base">{biome.landscapeEmoji}</span>
                        </div>
                        <div className="text-[11px] font-sans text-slate-400 font-normal leading-snug">
                          {stage.subtitle}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                          <span className="text-slate-400 capitalize">{stage.sentiment}</span>
                          <span className="text-amber-400 font-bold">★ {stage.sentimentScore}/5</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y-2 divide-slate-800 text-xs font-sans text-slate-100">
                {rows.map((row) => (
                  <tr
                    key={row.key}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="p-4 font-semibold bg-slate-950 border-r-2 border-slate-800 sticky left-0 z-10 align-top shadow-xs">
                      <div className="flex items-center gap-1.5 font-arcade text-xs text-amber-400 font-bold mb-1">
                        <span>{row.icon}</span>
                        <span>{row.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-normal leading-snug">
                        {row.description}
                      </p>
                    </td>

                    {stageKeys.map((stageKey) => {
                      const stage = journeyMap.stages[stageKey];
                      const cellData = stage[row.key];

                      return (
                        <td
                          key={stageKey}
                          className="p-4 border-r-2 border-slate-800 last:border-r-0 align-top relative group/cell"
                        >
                          <div className="pr-4">
                            {Array.isArray(cellData) ? (
                              <ul className="space-y-1.5">
                                {cellData.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed text-slate-200">
                                    <span className="text-amber-400 font-bold text-xs mt-0.5 shrink-0">▶</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="leading-relaxed text-slate-100 font-medium">
                                {cellData}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCellEdit(stageKey, row.key)}
                            className="absolute top-2 right-2 opacity-0 group-hover/cell:opacity-100 p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-all cursor-pointer"
                            title={`Edit ${row.label}`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* KPI Metric Row */}
                <tr className="bg-slate-950/80">
                  <td className="p-4 font-semibold bg-slate-950 border-r-2 border-slate-800 sticky left-0 z-10 align-top">
                    <div className="flex items-center gap-1.5 font-arcade text-xs text-emerald-400 font-bold mb-1">
                      <span>📊</span>
                      <span>KEY METRIC (KPI)</span>
                    </div>
                  </td>
                  {stageKeys.map((stageKey) => {
                    const stage = journeyMap.stages[stageKey];
                    return (
                      <td key={stageKey} className="p-4 border-r-2 border-slate-800 last:border-r-0 align-top">
                        <span className="inline-block px-2.5 py-1 bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-xs font-sans font-medium">
                          {stage.keyMetric}
                        </span>
                      </td>
                    );
                  })}
                </tr>

                {/* Strategic Opportunity Row */}
                <tr className="bg-amber-950/20">
                  <td className="p-4 font-semibold bg-slate-950 border-r-2 border-slate-800 sticky left-0 z-10 align-top">
                    <div className="flex items-center gap-1.5 font-arcade text-xs text-amber-400 font-bold mb-1">
                      <span>💡</span>
                      <span>CX OPPORTUNITY</span>
                    </div>
                  </td>
                  {stageKeys.map((stageKey) => {
                    const stage = journeyMap.stages[stageKey];
                    return (
                      <td key={stageKey} className="p-4 border-r-2 border-slate-800 last:border-r-0 align-top">
                        <p className="text-xs font-sans text-amber-100 font-medium leading-relaxed">
                          {stage.strategicOpportunity}
                        </p>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bottom Sticky Quest Footer Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-slate-900 border-4 border-slate-950 shadow-[4px_4px_0px_0px_#000] font-arcade">
        <div className="text-xs text-slate-300 text-center sm:text-left">
          <span className="font-bold text-amber-400">HERO STATUS:</span> {persona.name} is mapped across all 5 Overworld Kingdoms.
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundFx.playButton();
              onReset();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 nes-btn cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span>NEW GAME</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playCoin();
              setIsExportOpen(true);
            }}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold font-pixel text-slate-950 bg-amber-400 hover:bg-amber-300 border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000] nes-btn cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>EXPORT QUEST MAP</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        journeyMap={journeyMap}
        persona={persona}
      />

      {editState && (
        <EditCellModal
          isOpen={editState.isOpen}
          onClose={() => setEditState(null)}
          stageId={editState.stageId}
          stageData={journeyMap.stages[editState.stageId]}
          rowKey={editState.rowKey}
          onSave={handleSaveCellContent}
        />
      )}
    </div>
  );
};
