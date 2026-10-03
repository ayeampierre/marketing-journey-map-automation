import React, { useState } from 'react';
import { BusinessProfile, DistributionChannel, MarketReach, PricingTier } from '../types';
import { SAMPLE_PRESETS, SampleBusinessPreset } from '../lib/templates';
import { soundFx } from '../lib/soundFx';
import { Sparkles, ArrowRight, DollarSign, Globe, Truck, Lightbulb, Gamepad, Play, Check } from 'lucide-react';

interface BusinessInputFormProps {
  initialProfile?: BusinessProfile;
  onSubmit: (profile: BusinessProfile) => void;
  isLoading: boolean;
}

export const BusinessInputForm: React.FC<BusinessInputFormProps> = ({
  initialProfile,
  onSubmit,
  isLoading,
}) => {
  const [description, setDescription] = useState(
    initialProfile?.description || ''
  );
  const [pricingTier, setPricingTier] = useState<PricingTier>(
    initialProfile?.pricingTier || 'mid'
  );
  const [marketReach, setMarketReach] = useState<MarketReach>(
    initialProfile?.marketReach || 'national'
  );
  const [distributionChannel, setDistributionChannel] = useState<DistributionChannel>(
    initialProfile?.distributionChannel || 'direct_ecom'
  );
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');

  const handleSelectPreset = (preset: SampleBusinessPreset) => {
    soundFx.playCoin();
    setSelectedPresetId(preset.id);
    setDescription(preset.description);
    setPricingTier(preset.pricingTier);
    setMarketReach(preset.marketReach);
    setDistributionChannel(preset.distributionChannel);
  };

  const handleClear = () => {
    soundFx.playButton();
    setDescription('');
    setSelectedPresetId('');
  };

  const handleSelectPricing = (tier: PricingTier) => {
    soundFx.playCoin();
    setPricingTier(tier);
  };

  const handleSelectReach = (reach: MarketReach) => {
    soundFx.playCoin();
    setMarketReach(reach);
  };

  const handleSelectChannel = (channel: DistributionChannel) => {
    soundFx.playCoin();
    setDistributionChannel(channel);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    soundFx.playLevelUp();
    onSubmit({
      description: description.trim(),
      pricingTier,
      marketReach,
      distributionChannel,
    });
  };

  const pricingOptions: { id: PricingTier; label: string; desc: string; icon: string }[] = [
    { id: 'budget', label: '1. BUDGET / FREEMIUM', desc: 'Accessible, volume-driven, self-serve', icon: '🪙' },
    { id: 'mid', label: '2. MID-MARKET / PRO', desc: 'Balanced value & competitive price', icon: '🛡️' },
    { id: 'premium', label: '3. PREMIUM / LUXURY', desc: 'High craftsmanship & prestige margin', icon: '👑' },
    { id: 'enterprise', label: '4. ENTERPRISE / CUSTOM', desc: 'High-touch contracts & bespoke SLA', icon: '🏰' },
  ];

  const marketOptions: { id: MarketReach; label: string; desc: string; icon: string }[] = [
    { id: 'local', label: 'TOWN (LOCAL)', desc: 'City-level localized community', icon: '🏘️' },
    { id: 'national', label: 'KINGDOM (NATIONAL)', desc: 'Country-wide single currency', icon: '🗺️' },
    { id: 'global', label: 'WORLD (GLOBAL)', desc: 'Cross-border multi-currency realm', icon: '🌐' },
    { id: 'niche', label: 'GUILD (VERTICAL)', desc: 'Specialized industry cohort', icon: '⚔️' },
  ];

  const distributionOptions: { id: DistributionChannel; label: string; desc: string; icon: string }[] = [
    { id: 'direct_ecom', label: 'DTC MERCHANT BAZAAR', desc: 'Direct-to-consumer web checkout', icon: '🎪' },
    { id: 'b2b_sales', label: 'B2B ENVOY & DEMOS', desc: 'Consultative sales & live demos', icon: '📜' },
    { id: 'app_store', label: 'MOBILE ARCADE HUB', desc: 'iOS & Android App Store platforms', icon: '📱' },
    { id: 'omnichannel', label: 'OMNICHANNEL GUILD', desc: 'Digital plus brick-and-mortar stores', icon: '🏪' },
  ];

  const sentenceCount = description
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* 8-bit Quest Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 font-pixel text-[10px] mb-3 border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">
          <Gamepad className="w-3.5 h-3.5" />
          <span>WORLD 1: MISSION BRIEFING</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-pixel text-amber-400 tracking-wider uppercase leading-tight drop-shadow-[2px_2px_0px_#000]">
          Enter Your Business Quest
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-200 font-sans max-w-2xl mx-auto leading-relaxed">
          Describe what you offer in 2–3 sentences. Select your game parameters below to
          summon three distinct ideal consumer personas!
        </p>
      </div>

      {/* Preset Inspiration Cartridges */}
      <div className="mb-6 bg-slate-900 border-4 border-slate-950 p-5 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-arcade font-bold text-amber-300">
            <span className="text-base">🎮</span>
            <span>SAMPLE QUEST CARTRIDGES (CLICK TO LOAD):</span>
          </div>
          {selectedPresetId && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-arcade text-rose-400 hover:text-rose-300 underline cursor-pointer"
            >
              [ EJECT / CLEAR ]
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_PRESETS.map((preset, index) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-3 border-2 transition-all cursor-pointer font-sans ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-white shadow-[3px_3px_0px_0px_#000] scale-[1.02]'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[9px] text-amber-500 font-bold">SLOT {index + 1}</span>
                  {isSelected && <span className="font-bold text-xs">★ LOADED</span>}
                </div>
                <div className="font-bold text-xs mt-1 truncate">{preset.name}</div>
                <div className="text-[11px] opacity-80 truncate">{preset.category}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Input Quest Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border-4 border-slate-950 p-6 sm:p-8 space-y-7 shadow-[6px_6px_0px_0px_#000]">
        {/* Business Description Textarea */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="business-description" className="block text-xs font-arcade font-bold text-amber-400 uppercase tracking-wide">
              📜 Business & Offering Briefing (2-3 Sentences)
              <span className="text-rose-400 ml-1">*</span>
            </label>
            <div className="flex items-center gap-3">
              {description.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-arcade text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  [ Clear ]
                </button>
              )}
              <span
                className={`text-xs font-arcade ${
                  sentenceCount >= 2 && sentenceCount <= 4
                    ? 'text-emerald-400 font-bold'
                    : 'text-slate-400'
                }`}
              >
                STATUS: {sentenceCount} {sentenceCount === 1 ? 'SENTENCE' : 'SENTENCES'}
              </span>
            </div>
          </div>

          <div className="relative">
            <textarea
              id="business-description"
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setSelectedPresetId('');
              }}
              placeholder="e.g. A circular sustainable activewear brand crafting regenerative merino wool garments for conscious runners. Each purchase includes lifetime repair and free recycling trade-ins."
              className="w-full bg-slate-950 border-2 border-slate-700 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans leading-relaxed"
              required
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-400 font-sans">
            Tip: Clarify who your customer is, the primary bottleneck you conquer, and your unique superpower.
          </p>
        </div>

        {/* 8-Bit Multi-Choice Settings */}
        <div className="pt-4 border-t-2 border-slate-800 space-y-6">
          <div className="text-xs font-pixel text-amber-400 tracking-wider">
            SETTING UP GAME VARIABLES:
          </div>

          {/* Prompt 1: Pricing Tier */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-amber-400">🪙</span>
              <label className="text-xs font-arcade font-bold text-slate-200 uppercase tracking-wide">
                1. PRICING TIER & POWER LEVEL
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {pricingOptions.map((opt) => {
                const checked = pricingTier === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectPricing(opt.id)}
                    className={`flex flex-col text-left p-3 border-2 transition-all cursor-pointer font-sans nes-btn ${
                      checked
                        ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold shadow-[2px_2px_0px_0px_#000]'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-arcade font-bold flex items-center gap-1">
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </span>
                      {checked && <span className="font-bold text-xs">✓</span>}
                    </div>
                    <span className={`text-[11px] mt-1 font-sans ${checked ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt 2: Market Reach */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-sky-400">🌐</span>
              <label className="text-xs font-arcade font-bold text-slate-200 uppercase tracking-wide">
                2. REALM SCALE & GEOGRAPHIC REACH
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {marketOptions.map((opt) => {
                const checked = marketReach === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectReach(opt.id)}
                    className={`flex flex-col text-left p-3 border-2 transition-all cursor-pointer font-sans nes-btn ${
                      checked
                        ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold shadow-[2px_2px_0px_0px_#000]'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-arcade font-bold flex items-center gap-1">
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </span>
                      {checked && <span className="font-bold text-xs">✓</span>}
                    </div>
                    <span className={`text-[11px] mt-1 font-sans ${checked ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt 3: Distribution Channel */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-emerald-400">🎪</span>
              <label className="text-xs font-arcade font-bold text-slate-200 uppercase tracking-wide">
                3. PRIMARY DISTRIBUTION CHANNEL & MERCHANT ROUTE
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {distributionOptions.map((opt) => {
                const checked = distributionChannel === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectChannel(opt.id)}
                    className={`flex flex-col text-left p-3 border-2 transition-all cursor-pointer font-sans nes-btn ${
                      checked
                        ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold shadow-[2px_2px_0px_0px_#000]'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-arcade font-bold flex items-center gap-1">
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </span>
                      {checked && <span className="font-bold text-xs">✓</span>}
                    </div>
                    <span className={`text-[11px] mt-1 font-sans ${checked ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button (Arcade START Button) */}
        <div className="pt-4 border-t-2 border-slate-800 flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading || !description.trim()}
            className={`inline-flex items-center gap-3 px-8 py-4 font-pixel text-xs sm:text-sm text-slate-950 transition-all nes-btn cursor-pointer ${
              isLoading || !description.trim()
                ? 'bg-slate-700 text-slate-400 border-slate-600 cursor-not-allowed opacity-60'
                : 'bg-amber-400 hover:bg-amber-300 border-slate-950 shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1'
            }`}
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin">🪙</span>
                <span>SUMMONING 3 PERSONAS...</span>
              </>
            ) : (
              <>
                <span>⚔️ GENERATE 3 PERSONAS</span>
                <span className="text-base">▶</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
