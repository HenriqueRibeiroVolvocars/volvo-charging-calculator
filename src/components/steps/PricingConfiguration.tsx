import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, Fuel } from 'lucide-react';

interface PricingConfigurationProps {
  energyPrice: number;
  fuelPrice: number;
  chargingPower: number;
  chargingWindow: number;
  fuelType: string;
  onUpdate: (data: {
    energyPrice: number;
    fuelPrice: number;
    chargingPower: number;
    chargingWindow: number;
  }) => void;
  onBack: () => void;
}

const powerOptions = [3.7, 7.4, 11, 22];

export function PricingConfiguration({
  energyPrice,
  fuelPrice,
  chargingPower,
  chargingWindow,
  fuelType,
  onUpdate,
  onBack
}: PricingConfigurationProps) {
  const [localEnergyPrice, setLocalEnergyPrice] = useState(energyPrice);
  const [localFuelPrice, setLocalFuelPrice] = useState(fuelPrice);
  const [localChargingPower, setLocalChargingPower] = useState(chargingPower);
  const [localChargingWindow, setLocalChargingWindow] = useState(chargingWindow);

  const getFuelLabel = (tipo: string) => {
    if (tipo.includes('Gasolina')) return 'Gasolina';
    if (tipo.includes('Diesel')) return 'Diesel';
    if (tipo.includes('Etanol')) return 'Etanol';
    if (tipo.includes('Híbrido')) return 'Híbrido';
    return 'Combustível';
  };

  const handleSubmit = () => {
    onUpdate({
      energyPrice: localEnergyPrice,
      fuelPrice: localFuelPrice,
      chargingPower: localChargingPower,
      chargingWindow: localChargingWindow
    });
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-8 text-primary"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Voltar
      </Button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Preços e Recarga
        </h2>
        <p className="text-xl text-muted-foreground">
          Ajuste os valores para sua realidade
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Energy Price */}
        <Card className="p-8 shadow-medium hover:shadow-strong transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-accent/10">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary">Energia Elétrica</h3>
          </div>
          <Label htmlFor="energyPrice" className="text-sm text-muted-foreground mb-2 block">
            Preço por kWh
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-bold">
              R$
            </span>
            <Input
              id="energyPrice"
              type="number"
              step="0.01"
              value={localEnergyPrice}
              onChange={(e) => setLocalEnergyPrice(Number(e.target.value))}
              className="pl-12 text-2xl font-bold h-16 text-center"
            />
          </div>
        </Card>

        {/* Fuel Price */}
        <Card className="p-8 shadow-medium hover:shadow-strong transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-destructive/10">
              <Fuel className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-primary">{getFuelLabel(fuelType)}</h3>
          </div>
          <Label htmlFor="fuelPrice" className="text-sm text-muted-foreground mb-2 block">
            Preço por litro
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-bold">
              R$
            </span>
            <Input
              id="fuelPrice"
              type="number"
              step="0.01"
              value={localFuelPrice}
              onChange={(e) => setLocalFuelPrice(Number(e.target.value))}
              className="pl-12 text-2xl font-bold h-16 text-center"
            />
          </div>
        </Card>
      </div>

      <Card className="p-8 shadow-strong mb-8">
        <h3 className="text-xl font-bold text-primary mb-6">Configuração de Recarga</h3>
        
        <div className="space-y-8">
          {/* Charging Power */}
          <div>
            <Label className="text-sm text-muted-foreground mb-4 block">
              Potência do Carregador Residencial
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {powerOptions.map((power) => (
                <Button
                  key={power}
                  variant={localChargingPower === power ? 'default' : 'outline'}
                  onClick={() => setLocalChargingPower(power)}
                  className="h-16 text-lg font-bold"
                >
                  {power} kW
                </Button>
              ))}
            </div>
          </div>

          {/* Charging Window */}
          <div>
            <Label className="text-sm text-muted-foreground mb-4 block">
              Janela de Recarga Noturna: {localChargingWindow}h por noite
            </Label>
            <Slider
              value={[localChargingWindow]}
              onValueChange={(value) => setLocalChargingWindow(value[0])}
              min={4}
              max={12}
              step={1}
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Tempo disponível para carregar o veículo durante a noite
            </p>
          </div>
        </div>
      </Card>

      <Button
        onClick={handleSubmit}
        size="lg"
        className="w-full h-16 text-xl bg-primary hover:bg-accent"
      >
        Ver Resultados
        <ArrowRight className="ml-2 h-6 w-6" />
      </Button>
    </div>
  );
}
