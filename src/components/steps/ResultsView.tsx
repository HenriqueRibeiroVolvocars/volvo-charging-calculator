import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { RotateCcw, Zap, Fuel, TrendingDown, Clock, Battery } from 'lucide-react';
import { VolvoVehicle } from '@/data/volvoVehicles';
import { CompetitorVehicle } from '@/data/competitorVehicles';
import { calculateComparison, formatCurrency, formatNumber } from '@/utils/calculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResultsViewProps {
  volvoVehicle: VolvoVehicle;
  competitor: CompetitorVehicle;
  dailyKm: number;
  cityPercent: number;
  highwayPercent: number;
  energyPrice: number;
  fuelPrice: number;
  chargingPower: number;
  chargingWindow: number;
  onReset: () => void;
}

export function ResultsView({
  volvoVehicle,
  competitor,
  dailyKm,
  cityPercent,
  highwayPercent,
  energyPrice,
  fuelPrice,
  chargingPower,
  chargingWindow,
  onReset
}: ResultsViewProps) {
  const results = useMemo(() => {
    return calculateComparison({
      volvoVehicle,
      competitor,
      dailyKm,
      cityPercent,
      highwayPercent,
      energyPriceKwh: energyPrice,
      fuelPricePerLiter: fuelPrice,
      chargingPowerKw: chargingPower,
      chargingWindow
    });
  }, [volvoVehicle, competitor, dailyKm, cityPercent, highwayPercent, energyPrice, fuelPrice, chargingPower, chargingWindow]);

  const chartData = [
    { year: '1 ano', 'Economia Acumulada': results.cumulativeSavings.year1 },
    { year: '2 anos', 'Economia Acumulada': results.cumulativeSavings.year2 },
    { year: '3 anos', 'Economia Acumulada': results.cumulativeSavings.year3 },
    { year: '4 anos', 'Economia Acumulada': results.cumulativeSavings.year4 },
    { year: '5 anos', 'Economia Acumulada': results.cumulativeSavings.year5 }
  ];

  return (
    <div className="container mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Comparativo de Custos
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Com o <span className="font-bold text-primary">{volvoVehicle.displayName}</span>, você gastaria{' '}
          <span className="font-bold text-primary">{formatCurrency(results.ev.dailyCost)}/dia</span> e precisaria de{' '}
          <span className="font-bold text-primary">{formatNumber(results.ev.dailyChargingTime, 1)}h</span> de recarga.
          No <span className="font-bold text-muted-foreground">{competitor.marca} {competitor.modelo}</span>, seriam{' '}
          <span className="font-bold text-muted-foreground">{formatCurrency(results.ice.dailyCost)}/dia</span>.
        </p>
      </motion.div>

      {/* Cost Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-primary">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">{volvoVehicle.displayName}</h3>
              <p className="text-sm text-muted-foreground">Veículo Elétrico</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Custo Diário</p>
              <p className="text-4xl font-bold text-primary">{formatCurrency(results.ev.dailyCost)}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Semana</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(results.ev.weeklyCost)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mês</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(results.ev.monthlyCost)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ano</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(results.ev.yearlyCost)}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-secondary/50 to-secondary/30 border-2 border-border shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-muted">
              <Fuel className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">{competitor.marca}</h3>
              <p className="text-sm text-muted-foreground">{competitor.modelo}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Custo Diário</p>
              <p className="text-4xl font-bold text-foreground">{formatCurrency(results.ice.dailyCost)}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Semana</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(results.ice.weeklyCost)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mês</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(results.ice.monthlyCost)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ano</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(results.ice.yearlyCost)}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Savings & Charging Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="h-6 w-6 text-primary" />
            <h4 className="font-bold text-primary">Economia Anual</h4>
          </div>
          <p className="text-3xl font-bold text-primary">{formatCurrency(results.savings.yearly)}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-primary" />
            <h4 className="font-bold text-primary">Tempo de Recarga</h4>
          </div>
          <p className="text-3xl font-bold text-primary">
            {formatNumber(results.ev.dailyChargingTime, 1)}h
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {results.ev.chargesFitsWindow 
              ? `✓ Cabe na janela de ${chargingWindow}h` 
              : `⚠ Excede janela de ${chargingWindow}h`}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center gap-3 mb-4">
            <Battery className="h-6 w-6 text-primary" />
            <h4 className="font-bold text-primary">Bateria/Dia</h4>
          </div>
          <p className="text-3xl font-bold text-primary">
            {formatNumber(results.ev.dailyBatteryPercent, 1)}%
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {formatNumber(results.ev.dailyEnergy, 1)} kWh consumidos
          </p>
        </Card>
      </div>

      {/* 5-Year Cumulative Savings Chart */}
      <Card className="p-8 shadow-soft mb-8">
        <h3 className="text-2xl font-bold text-primary mb-2">Economia Acumulada ao Longo do Tempo</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Veja como a economia cresce com o passar dos anos
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="year" 
              stroke="hsl(var(--foreground))"
              style={{ fontSize: '14px' }}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              style={{ fontSize: '14px' }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Economia Acumulada" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onReset}
          size="lg"
          variant="outline"
          className="h-16 px-12 text-xl border-2 hover:border-primary"
        >
          <RotateCcw className="mr-2 h-6 w-6" />
          Nova Comparação
        </Button>
      </div>
    </div>
  );
}
