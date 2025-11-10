import { useState, useEffect } from 'react';
import { fetchCompetitorVehicles, CompetitorVehicle } from '@/data/competitorVehiclesAPI';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';

interface CompetitorSelectionProps {
  onSelect: (competitor: CompetitorVehicle) => void;
  onBack: () => void;
}

export function CompetitorSelection({ onSelect, onBack }: CompetitorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [competitors, setCompetitors] = useState<CompetitorVehicle[]>([]);
  const [filteredCompetitors, setFilteredCompetitors] = useState<CompetitorVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // 🔹 Função auxiliar — pega até 2 veículos por marca, limitando a 30 no total
  const getTopTwoPerBrand = (data: CompetitorVehicle[]): CompetitorVehicle[] => {
    const grouped: Record<string, CompetitorVehicle[]> = {};

    // Agrupa por marca
    data.forEach((vehicle) => {
      const marca = vehicle.marca || 'Indefinida';
      if (!grouped[marca]) grouped[marca] = [];
      if (grouped[marca].length < 2) grouped[marca].push(vehicle);
    });

    // Junta todos os veículos (máximo 2 por marca)
    const limited = Object.values(grouped).flat().slice(0, 30);

    return limited;
  };

  useEffect(() => {
    const loadCompetitors = async () => {
      try {
        const data = await fetchCompetitorVehicles();
        setCompetitors(data);

        // 🔹 Exibe até 30 veículos (2 de cada marca)
        const limited = getTopTwoPerBrand(data);
        setFilteredCompetitors(limited);
      } catch (error) {
        console.error('Erro ao carregar competidores:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCompetitors();
  }, []);

  const handleSearch = () => {
    setSearching(true);
    setFilteredCompetitors([]);

    setTimeout(() => {
      if (searchTerm.trim() === '') {
        // 🔹 Caso não tenha busca, mostra 30 (2 por marca)
        setFilteredCompetitors(getTopTwoPerBrand(competitors));
        setSearching(false);
        return;
      }

      const filtered = competitors.filter(comp =>
        comp.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.modelo.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // 🔹 Mesmo após busca, respeita limite de 2 por marca
      const limited = getTopTwoPerBrand(filtered);
      setFilteredCompetitors(limited);
      setSearching(false);
    }, 300);
  };

  const getFuelLabel = (tipo?: string) => {
    if (!tipo) return 'Indefinido';
    if (tipo.includes('Combustão')) return 'Gasolina';
    if (tipo.includes('Gasolina')) return 'Gasolina';
    if (tipo.includes('Diesel')) return 'Diesel';
    if (tipo.includes('Etanol')) return 'Etanol';
    if (tipo.includes('Híbrido')) return 'Híbrido';
    return tipo;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto max-w-6xl">
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
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Escolha o veículo que deseja comparar
        </h2>
        <p className="text-xl text-muted-foreground mb-6">
          Selecione um veículo a combustão para comparar
        </p>

        <div className="max-w-md mx-auto flex items-center gap-2 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Buscar marca ou modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="pl-12 h-14 text-lg border-2 focus:border-accent"
          />
          <Button
            onClick={handleSearch}
            className="h-14 px-6 text-lg"
          >
            Buscar
          </Button>
        </div>
      </motion.div>

      {(loading || searching) ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {loading ? 'Carregando veículos...' : 'Buscando veículos...'}
          </p>
        </div>
      ) : (
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
      )}

      {!loading && !searching && filteredCompetitors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Nenhum veículo encontrado com esse termo de busca.
          </p>
        </div>
      )}
    </div>
  );
}
