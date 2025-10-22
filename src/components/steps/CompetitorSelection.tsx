import { useState } from 'react';
import { getCompetitorsByLine, CompetitorVehicle } from '@/data/competitorVehicles';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';

interface CompetitorSelectionProps {
  volvoCategory: 'linha30' | 'linha40' | 'linha60' | 'linha90';
  onSelect: (competitor: CompetitorVehicle) => void;
  onBack: () => void;
}

export function CompetitorSelection({ volvoCategory, onSelect, onBack }: CompetitorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const competitors = getCompetitorsByLine(volvoCategory);
  
  const filteredCompetitors = competitors.filter(comp =>
    comp.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFuelLabel = (tipo: string) => {
    if (tipo.includes('Gasolina')) return 'Gasolina';
    if (tipo.includes('Diesel')) return 'Diesel';
    if (tipo.includes('Etanol')) return 'Etanol';
    if (tipo.includes('Híbrido')) return 'Híbrido';
    return tipo;
  };

  return (
    <div className="container mx-auto max-w-6xl">
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
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Escolha o veículo que deseja comparar
        </h2>
        <p className="text-xl text-muted-foreground mb-6">
          Selecione um veículo a combustão para comparar
        </p>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Buscar marca ou modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 text-lg border-2 focus:border-accent"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto px-2">
        {filteredCompetitors.map((competitor, index) => (
          <motion.div
            key={`${competitor.marca}-${competitor.modelo}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className="group cursor-pointer hover:shadow-medium transition-all duration-200 border hover:border-accent p-5"
              onClick={() => onSelect(competitor)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-primary">
                    {competitor.marca}
                  </h3>
                  <p className="text-sm text-foreground mt-1">
                    {competitor.modelo}
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                  {getFuelLabel(competitor.tipoCombustivel)}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <div>
                  <span className="font-semibold text-foreground">{competitor.kmLCidade}</span> km/l cidade
                </div>
                <div>
                  <span className="font-semibold text-foreground">{competitor.kmLEstrada}</span> km/l estrada
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCompetitors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Nenhum veículo encontrado com esse termo de busca
          </p>
        </div>
      )}
    </div>
  );
}
