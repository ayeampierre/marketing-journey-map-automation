import React, { useState, useEffect } from 'react';
import { AppStep, BusinessProfile, CustomerJourneyMap, Persona } from './types';
import { SAMPLE_PRESETS, generateFallbackJourneyMap, generateFallbackPersonas } from './lib/templates';
import { Header } from './components/Header';
import { WelcomeGuide } from './components/WelcomeGuide';
import { BusinessInputForm } from './components/BusinessInputForm';
import { PersonaSelectionDashboard } from './components/PersonaSelectionDashboard';
import { CustomerJourneyMapMatrix } from './components/CustomerJourneyMapMatrix';
import { AlertCircle, X } from 'lucide-react';

const WELCOME_STORAGE_KEY = 'cx_studio_welcome_seen';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('business-input');

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    description: '',
    pricingTier: 'mid',
    marketReach: 'national',
    distributionChannel: 'direct_ecom',
  });

  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [journeyMap, setJourneyMap] = useState<CustomerJourneyMap | null>(null);

  const [isLoadingPersonas, setIsLoadingPersonas] = useState(false);
  const [isLoadingJourney, setIsLoadingJourney] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Welcome modal for first-time users
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = localStorage.getItem(WELCOME_STORAGE_KEY);
      if (!hasSeen) {
        setIsGuideOpen(true);
      }
    } catch {
      setIsGuideOpen(true);
    }
  }, []);

  const handleCloseGuide = () => {
    setIsGuideOpen(false);
    try {
      localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  const handleTryExampleFromGuide = () => {
    setBusinessProfile({
      description: SAMPLE_PRESETS[0].description,
      pricingTier: SAMPLE_PRESETS[0].pricingTier,
      marketReach: SAMPLE_PRESETS[0].marketReach,
      distributionChannel: SAMPLE_PRESETS[0].distributionChannel,
    });
    handleCloseGuide();
  };

  // Step 1 -> Step 2: Generate Personas
  const handleBusinessSubmit = async (profile: BusinessProfile) => {
    setBusinessProfile(profile);
    setIsLoadingPersonas(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business: profile }),
      });

      if (!response.ok) {
        throw new Error('Generation service unavailable');
      }

      const data = await response.json();
      if (data.personas && Array.isArray(data.personas) && data.personas.length > 0) {
        setPersonas(data.personas);
        setSelectedPersona(data.personas[0]);
        setCurrentStep('persona-selection');
      } else {
        throw new Error('No personas returned');
      }
    } catch (_err) {
      // Graceful fallback ensures user never gets blocked
      const fallbackPersonas = generateFallbackPersonas(profile);
      setPersonas(fallbackPersonas);
      setSelectedPersona(fallbackPersonas[0]);
      setCurrentStep('persona-selection');
    } finally {
      setIsLoadingPersonas(false);
    }
  };

  // Step 2 -> Step 3: Generate Customer Journey Map
  const handleConfirmPersona = async () => {
    const activePersona = selectedPersona || personas[0];
    if (!activePersona) return;

    setIsLoadingJourney(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business: businessProfile, persona: activePersona }),
      });

      if (!response.ok) {
        throw new Error('Journey generation service unavailable');
      }

      const data = await response.json();
      if (data.journeyMap && data.journeyMap.stages) {
        setJourneyMap(data.journeyMap);
        setCurrentStep('journey-matrix');
      } else {
        throw new Error('Invalid journey map data returned');
      }
    } catch (_err) {
      // Graceful fallback ensures journey map is always rendered
      const fallbackJourney = generateFallbackJourneyMap(activePersona, businessProfile);
      setJourneyMap(fallbackJourney);
      setCurrentStep('journey-matrix');
    } finally {
      setIsLoadingJourney(false);
    }
  };

  // Reset to initial clean state
  const handleReset = () => {
    setBusinessProfile({
      description: '',
      pricingTier: 'mid',
      marketReach: 'national',
      distributionChannel: 'direct_ecom',
    });
    setPersonas([]);
    setSelectedPersona(null);
    setJourneyMap(null);
    setErrorMessage(null);
    setCurrentStep('business-input');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pixel-grid-bg selection:bg-amber-400 selection:text-slate-950">
      {/* Global Header */}
      <Header
        currentStep={currentStep}
        onStepClick={(step) => {
          if (step === 'business-input') {
            setCurrentStep('business-input');
          } else if (step === 'persona-selection' && personas.length > 0) {
            setCurrentStep('persona-selection');
          } else if (step === 'journey-matrix' && journeyMap) {
            setCurrentStep('journey-matrix');
          }
        }}
        onReset={handleReset}
        onOpenGuide={() => setIsGuideOpen(true)}
        selectedPersonaName={selectedPersona?.name}
      />

      {/* Welcome Guide Modal for first-time users */}
      <WelcomeGuide
        isOpen={isGuideOpen}
        onClose={handleCloseGuide}
        onTryExample={handleTryExampleFromGuide}
      />

      {/* Friendly error notification if needed */}
      {errorMessage && (
        <div className="max-w-4xl mx-auto mt-4 px-4 sm:px-6 w-full">
          <div className="p-3 bg-rose-950 border-2 border-rose-500 text-rose-200 rounded-none flex items-center justify-between text-xs font-arcade">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="p-1 hover:bg-rose-900 rounded text-rose-300 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Views */}
      <main className="flex-1 pb-16">
        {/* VIEW 1: Business Input Form */}
        {currentStep === 'business-input' && (
          <BusinessInputForm
            initialProfile={businessProfile}
            onSubmit={handleBusinessSubmit}
            isLoading={isLoadingPersonas}
          />
        )}

        {/* VIEW 2: Persona Selection Dashboard */}
        {currentStep === 'persona-selection' && personas.length > 0 && (
          <PersonaSelectionDashboard
            personas={personas}
            businessProfile={businessProfile}
            selectedPersona={selectedPersona}
            onSelectPersona={(persona) => setSelectedPersona(persona)}
            onConfirm={handleConfirmPersona}
            onBackToInput={() => setCurrentStep('business-input')}
            isGeneratingJourney={isLoadingJourney}
          />
        )}

        {/* VIEW 3: Customer Journey Map Matrix */}
        {currentStep === 'journey-matrix' && journeyMap && selectedPersona && (
          <CustomerJourneyMapMatrix
            journeyMap={journeyMap}
            persona={selectedPersona}
            onReset={handleReset}
            onSwitchPersona={() => setCurrentStep('persona-selection')}
            onUpdateJourneyMap={(updated) => setJourneyMap(updated)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-slate-900 bg-slate-950 py-6 text-slate-400 font-arcade text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-pixel text-[10px] text-amber-400">Marketing Journey Map Generator</span>
            <span>·</span>
            <span>8-Bit Overworld CX Architecture</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-[11px]">
            <span>🌱 AWARENESS</span>
            <span>▶</span>
            <span>🌲 CONSIDERATION</span>
            <span>▶</span>
            <span>🏰 CONVERT</span>
            <span>▶</span>
            <span>⚓ LOYALTY</span>
            <span>▶</span>
            <span>⭐ ADVOCACY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
