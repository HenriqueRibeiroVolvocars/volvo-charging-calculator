import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { RotateCcw, Zap, Fuel, TrendingDown, Clock, Battery } from 'lucide-react';
import { VolvoVehicle } from '@/data/volvoVehicles';
import { CompetitorVehicle } from '@/data/competitorVehicles';
import { calculateComparison, formatCurrency, formatNumber } from '@/utils/calculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    { month: 'Jan', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Fev', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Mar', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Abr', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Mai', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Jun', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Jul', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Ago', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Set', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Out', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Nov', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost },
    { month: 'Dez', Elétrico: results.ev.monthlyCost, Combustão: results.ice.monthlyCost }
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
          Com o <span className="font-bold text-accent">{volvoVehicle.displayName}</span>, você gastaria{' '}
          <span className="font-bold text-accent">{formatCurrency(results.ev.dailyCost)}/dia</span> e precisaria de{' '}
          <span className="font-bold text-accent">{formatNumber(results.ev.dailyChargingTime, 1)}h</span> de recarga.
          No <span className="font-bold text-destructive">{competitor.marca} {competitor.modelo}</span>, seriam{' '}
          <span className="font-bold text-destructive">{formatCurrency(results.ice.dailyCost)}/dia</span>.
        </p>
      </motion.div>

      {/* Cost Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent shadow-strong">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-accent">
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
              <p className="text-4xl font-bold text-accent">{formatCurrency(results.ev.dailyCost)}</p>
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

        <Card className="p-8 bg-gradient-to-br from-destructive/10 to-destructive/5 border-2 border-destructive shadow-strong">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-destructive">
              <Fuel className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">{competitor.marca}</h3>
              <p className="text-sm text-muted-foreground">{competitor.modelo}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Custo Diário</p>
              <p className="text-4xl font-bold text-destructive">{formatCurrency(results.ice.dailyCost)}</p>
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

        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-accent" />
            <h4 className="font-bold text-primary">Tempo de Recarga</h4>
          </div>
          <p className="text-3xl font-bold text-accent">
            {formatNumber(results.ev.dailyChargingTime, 1)}h
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {results.ev.chargesFitsWindow 
              ? `✓ Cabe na janela de ${chargingWindow}h` 
              : `⚠ Excede janela de ${chargingWindow}h`}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="flex items-center gap-3 mb-4">
            <Battery className="h-6 w-6 text-accent" />
            <h4 className="font-bold text-primary">Bateria/Dia</h4>
          </div>
          <p className="text-3xl font-bold text-accent">
            {formatNumber(results.ev.dailyBatteryPercent, 1)}%
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {formatNumber(results.ev.dailyEnergy, 1)} kWh consumidos
          </p>
        </Card>
      </div>

      {/* 12-Month Chart */}
      <Card className="p-8 shadow-strong mb-8">
        <h3 className="text-2xl font-bold text-primary mb-6">Comparativo Anual (12 meses)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="Elétrico" fill="hsl(200, 95%, 60%)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Combustão" fill="hsl(0, 72%, 51%)" radius={[8, 8, 0, 0]} />
          </BarChart>
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
