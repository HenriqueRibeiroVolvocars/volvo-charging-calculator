import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VehicleSelection } from '@/components/steps/VehicleSelection';
import { CompetitorSelection } from '@/components/steps/CompetitorSelection';
import { UsageConfiguration } from '@/components/steps/UsageConfiguration';
import { PricingConfiguration } from '@/components/steps/PricingConfiguration';
import { ResultsView } from '@/components/steps/ResultsView';
import { VolvoVehicle } from '@/data/volvoVehicles';
import { CompetitorVehicle } from '@/data/competitorVehiclesAPI';
import logoVolvo from '@/assets/volvo-logo.png';

export type Step = 'vehicle' | 'competitor' | 'usage' | 'pricing' | 'results';

export interface AppState {
  step: Step;
  selectedVolvo?: VolvoVehicle;
  selectedCompetitor?: CompetitorVehicle;
  dailyKm: number;
  cityPercent: number;
  highwayPercent: number;
  energyPrice: number;
  fuelPrice: number;
  chargingPower: number;
  chargingWindow: number;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>({
    step: 'vehicle',
    dailyKm: 40,
    cityPercent: 70,
    highwayPercent: 30,
    energyPrice: 0.95,
    fuelPrice: 5.99,
    chargingPower: 7.4,
    chargingWindow: 8
  });

  const updateState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const goToStep = (step: Step) => {
    setAppState(prev => ({ ...prev, step }));
  };

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [appState.step]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background" id="pdf-container">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-6 py-6">
          
          <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
            
            {/* Coluna 1 — LOGO */}
            <div className="flex justify-center">
              <img
                src={logoVolvo}
                alt="Volvo Logo"
                className="w-12 h-12"
              />
            </div>

            {/* Coluna 2 — Título + Subtítulo */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-primary-foreground tracking-wide">
                VOLVO ELECTRIC COMPARISON
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Comparativo de custos: Elétrico vs Combustão
              </p>
            </div>

          </div>

        </div>
      </header>


      {/* Main Content */}
      <main className="pt-32 pb-20 px-4">
        <AnimatePresence mode="wait">
          {appState.step === 'vehicle' && (
            <motion.div
              key="vehicle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VehicleSelection
                onSelect={(vehicle) => {
                  updateState({ selectedVolvo: vehicle });
                  goToStep('competitor');
                }}
              />
            </motion.div>
          )}

          {appState.step === 'competitor' && appState.selectedVolvo && (
            <motion.div
              key="competitor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CompetitorSelection
                onSelect={(competitor) => {
                  updateState({ selectedCompetitor: competitor });
                  goToStep('usage');
                }}
                onBack={() => goToStep('vehicle')}
              />
            </motion.div>
          )}

          {appState.step === 'usage' && (
            <motion.div
              key="usage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UsageConfiguration
                dailyKm={appState.dailyKm}
                cityPercent={appState.cityPercent}
                highwayPercent={appState.highwayPercent}
                onUpdate={(data) => {
                  updateState(data);
                  goToStep('pricing');
                }}
                onBack={() => goToStep('competitor')}
              />
            </motion.div>
          )}

          {appState.step === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PricingConfiguration
                energyPrice={appState.energyPrice}
                fuelPrice={appState.fuelPrice}
                chargingPower={appState.chargingPower}
                chargingWindow={appState.chargingWindow}
                fuelType={appState.selectedCompetitor?.tipoCombustivel || 'Gasolina'}
                onUpdate={(data) => {
                  updateState(data);
                  goToStep('results');
                }}
                onBack={() => goToStep('usage')}
              />
            </motion.div>
          )}

          {appState.step === 'results' && appState.selectedVolvo && appState.selectedCompetitor && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsView
                volvoVehicle={appState.selectedVolvo}
                competitor={appState.selectedCompetitor}
                dailyKm={appState.dailyKm}
                cityPercent={appState.cityPercent}
                highwayPercent={appState.highwayPercent}
                energyPrice={appState.energyPrice}
                fuelPrice={appState.fuelPrice}
                chargingPower={appState.chargingPower}
                chargingWindow={appState.chargingWindow}
                onReset={() => {
                  setAppState({
                    step: 'vehicle',
                    dailyKm: 40,
                    cityPercent: 70,
                    highwayPercent: 30,
                    energyPrice: 0.95,
                    fuelPrice: 5.99,
                    chargingPower: 7.4,
                    chargingWindow: 8
                  });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
