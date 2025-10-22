import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface UsageConfigurationProps {
  dailyKm: number;
  cityPercent: number;
  highwayPercent: number;
  onUpdate: (data: { dailyKm: number; cityPercent: number; highwayPercent: number }) => void;
  onBack: () => void;
}

export function UsageConfiguration({
  dailyKm,
  cityPercent,
  highwayPercent,
  onUpdate,
  onBack
}: UsageConfigurationProps) {
  const [localDailyKm, setLocalDailyKm] = useState(dailyKm);
  const [localCityPercent, setLocalCityPercent] = useState(cityPercent);

  const handleCityChange = (value: number[]) => {
    setLocalCityPercent(value[0]);
  };

  const handleSubmit = () => {
    onUpdate({
      dailyKm: localDailyKm,
      cityPercent: localCityPercent,
      highwayPercent: 100 - localCityPercent
    });
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-8 text-primary hover:text-accent"
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
          Perfil de Uso
        </h2>
        <p className="text-xl text-muted-foreground">
          Como você utiliza seu veículo no dia a dia?
        </p>
      </motion.div>

      <Card className="p-8 md:p-12 shadow-strong">
        <div className="space-y-10">
          {/* Daily KM */}
          <div>
            <Label htmlFor="dailyKm" className="text-lg font-semibold mb-4 block">
              Quilometragem Diária
            </Label>
            <div className="flex gap-4 items-center">
              <Slider
                value={[localDailyKm]}
                onValueChange={(value) => setLocalDailyKm(value[0])}
                min={10}
                max={200}
                step={5}
                className="flex-1"
              />
              <div className="relative w-28">
                <Input
                  id="dailyKm"
                  type="number"
                  value={localDailyKm}
                  onChange={(e) => setLocalDailyKm(Number(e.target.value))}
                  className="text-lg font-bold text-center pr-12 h-12"
                  min={10}
                  max={200}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  km
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Média de {(localDailyKm * 7).toFixed(0)} km por semana • {(localDailyKm * 30).toFixed(0)} km por mês
            </p>
          </div>

          {/* City/Highway Mix */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">
              Perfil de Rodagem
            </Label>
            <div className="space-y-4">
              <Slider
                value={[localCityPercent]}
                onValueChange={handleCityChange}
                min={0}
                max={100}
                step={5}
                className="mb-6"
              />
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 bg-secondary border-2 border-transparent hover:border-accent transition-all">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {localCityPercent}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Cidade
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-secondary border-2 border-transparent hover:border-accent transition-all">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {100 - localCityPercent}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Estrada
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full h-16 text-xl bg-primary hover:bg-accent"
          >
            Continuar
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
