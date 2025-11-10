import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompetitorVehicle, fetchCompetitorVehicles } from '@/data/competitorVehiclesAPI';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CompetitorSelectionProps {
  onSelect: (competitor: CompetitorVehicle) => void;
  onBack: () => void;
}

export function CompetitorSelection({ onSelect, onBack }: CompetitorSelectionProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [vehicles, setVehicles] = useState<CompetitorVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      const data = await fetchCompetitorVehicles();
      setVehicles(data);
      setIsLoading(false);
    };
    loadVehicles();
  }, []);
  
  const brands = Array.from(new Set(vehicles.map(v => v.marca))).sort();
  const models = selectedBrand 
    ? vehicles.filter(v => v.marca === selectedBrand).map(v => v.modelo).sort()
    : [];

  const handleConfirm = () => {
    const vehicle = vehicles.find(
      v => v.marca === selectedBrand && v.modelo === selectedModel
    );
    if (vehicle) {
      onSelect(vehicle);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-4">
        Escolha o veículo que deseja comparar
      </h2>
      <p className="text-xl text-muted-foreground text-center mb-8">
        Selecione a marca e modelo do veículo a combustão
      </p>

      <Card className="max-w-2xl mx-auto p-8 shadow-soft">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando veículos...</p>
          </div>
        ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Marca
            </label>
            <Select value={selectedBrand} onValueChange={(value) => {
              setSelectedBrand(value);
              setSelectedModel('');
            }}>
              <SelectTrigger className="w-full h-14 text-lg border-2 focus:border-primary">
                <SelectValue placeholder="Selecione a marca" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Modelo
            </label>
            <Select 
              value={selectedModel} 
              onValueChange={setSelectedModel}
              disabled={!selectedBrand}
            >
              <SelectTrigger className="w-full h-14 text-lg border-2 focus:border-primary">
                <SelectValue placeholder="Selecione o modelo" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              size="lg"
              className="flex-1 h-14 text-lg border-2"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Voltar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedBrand || !selectedModel}
              size="lg"
              className="flex-1 h-14 text-lg"
            >
              Continuar
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        )}
      </Card>
    </motion.div>
  );
}
