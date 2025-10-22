import { volvoVehicles, VolvoVehicle } from '@/data/volvoVehicles';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface VehicleSelectionProps {
  onSelect: (vehicle: VolvoVehicle) => void;
}

export function VehicleSelection({ onSelect }: VehicleSelectionProps) {
  return (
    <div className="container mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Escolha seu Volvo
        </h2>
        <p className="text-xl text-muted-foreground">
          Selecione o modelo para iniciar a comparação
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {volvoVehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="group cursor-pointer overflow-hidden hover:shadow-strong transition-all duration-300 border-2 hover:border-accent"
              onClick={() => onSelect(vehicle)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gradient-subtle">
                <img
                  src={vehicle.image}
                  alt={vehicle.displayName}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {vehicle.displayName}
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">{vehicle.batteryCapacity} kWh</span> • {vehicle.autonomy} km
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
