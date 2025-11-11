import { useState, useEffect } from 'react';
import { fetchCompetitorVehicles, CompetitorVehicle } from '@/data/competitorVehiclesAPI';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { deduplicateVehicles } from '@/utils/vehicleDeduplication';
import { sortBrandsByTier } from '@/constants/brandOrder';
import { getBrandLogo } from '@/utils/brandLogos';

interface CompetitorSelectionProps {
  onSelect: (competitor: CompetitorVehicle) => void;
  onBack: () => void;
}

export function CompetitorSelection({ onSelect, onBack }: CompetitorSelectionProps) {
  const [view, setView] = useState<'brands' | 'models'>('brands');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allVehicles, setAllVehicles] = useState<CompetitorVehicle[]>([]);
  const [uniqueModels, setUniqueModels] = useState<CompetitorVehicle[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [filteredResults, setFilteredResults] = useState<CompetitorVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // Função para normalizar nomes de marcas (unifica variantes)
  const normalizeBrandName = (brand: string): string => {
    const normalized = brand.toUpperCase().trim();
    
    // Mapeamento de variantes -> marca principal
    const brandMap: Record<string, string> = {
      'VW': 'VOLKSWAGEN',
      'MERCEDES': 'MERCEDES-BENZ',
      'CAOA CHERY': 'CHERY',
      'JAC MOTORS': 'JAC',
      'CITROEN': 'CITROËN',
    };
    
    return brandMap[normalized] || normalized;
  };

  // Extrair marcas únicas e ordenadas
  const extractBrands = (vehicles: CompetitorVehicle[]): string[] => {
    const normalizedBrands = vehicles.map(v => normalizeBrandName(v.marca));
    const uniqueBrands = Array.from(new Set(normalizedBrands));
    return sortBrandsByTier(uniqueBrands);
  };

  useEffect(() => {
    const loadCompetitors = async () => {
      try {
        const data = await fetchCompetitorVehicles();
        
        // Deduplica modelos
        const deduplicated = deduplicateVehicles(data);
        
        setAllVehicles(deduplicated);
        setUniqueModels(deduplicated);
        
        // Extrai e ordena marcas
        const extractedBrands = extractBrands(deduplicated);
        setBrands(extractedBrands);
        
        setFilteredResults(deduplicated);
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

    setTimeout(() => {
      if (searchTerm.trim() === '') {
        // Sem busca: mostrar tela de marcas
        setView('brands');
        setSelectedBrand(null);
        setFilteredResults(uniqueModels);
        setSearching(false);
        return;
      }

      // Com busca: filtrar diretamente nos modelos
      const filtered = uniqueModels.filter(comp =>
        comp.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.modelo.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredResults(filtered);
      setView('models');
      setSelectedBrand(null);
      setSearching(false);
    }, 300);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    const filtered = uniqueModels.filter(v => 
      normalizeBrandName(v.marca) === brand
    );
    setFilteredResults(filtered);
    setView('models');
  };

  const handleBackToBrands = () => {
    setView('brands');
    setSelectedBrand(null);
    setSearchTerm('');
    setFilteredResults(uniqueModels);
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
          {view === 'brands' ? 'Selecione uma marca' : selectedBrand || 'Selecione um modelo'}
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
      ) : view === 'brands' && !searchTerm ? (
        // TELA 1: Seleção de Marcas
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2">
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card
                className="group cursor-pointer hover:shadow-medium transition-all duration-200 border-2 hover:border-accent p-6 text-center h-32 flex flex-col items-center justify-center"
                onClick={() => handleBrandSelect(brand)}
              >
                <div className="mb-2 group-hover:scale-110 transition-transform">
                  {getBrandLogo(brand)}
                </div>
                <h3 className="text-sm font-bold text-foreground leading-tight">
                  {brand}
                </h3>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        // TELA 2: Seleção de Modelos
        <>
          {selectedBrand && !searchTerm && (
            <Button
              variant="ghost"
              onClick={handleBackToBrands}
              className="mb-4 text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para marcas
            </Button>
          )}
          
          {filteredResults.length > 0 && (
            <p className="text-sm text-muted-foreground mb-4 text-center">
              {filteredResults.length} {filteredResults.length === 1 ? 'modelo disponível' : 'modelos disponíveis'}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto px-2">
            {filteredResults.map((competitor, index) => (
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
                  <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    {competitor.kmEletrico && competitor.kmEletrico > 0 && (
                      <div>
                        <span className="font-semibold text-foreground">Autonomia elétrica:</span> {competitor.kmEletrico} km
                      </div>
                    )}
                    <div className="flex gap-4">
                      {competitor.kmLCidade > 0 && (
                        <div>
                          <span className="font-semibold text-foreground">{competitor.kmLCidade}</span> km/l cidade
                        </div>
                      )}
                      {competitor.kmLEstrada > 0 && (
                        <div>
                          <span className="font-semibold text-foreground">{competitor.kmLEstrada}</span> km/l estrada
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum veículo encontrado com esse termo de busca.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
