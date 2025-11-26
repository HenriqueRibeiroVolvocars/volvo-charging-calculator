import ex30Image from '@/assets/01-EX30.png';
import ec40Image from '@/assets/02-EC40.png';
import xc40Image from '@/assets/03-XC40.png';
import xc60Image from '@/assets/04-XC60.png';
import xc90Image from '@/assets/05-XC90.png';
import ex90Image from '@/assets/06-EX90.png';

export interface VolvoVehicle {
  id: string;
  name: string;
  displayName: string;
  batteryCapacity: number; // kWh
  autonomy: number; // km INMETRO (autonomia elétrica)
  priceRange: string;
  image: string;
  category: 'linha30' | 'linha40' | 'linha60' | 'linha90';
  kmLCidade?: number; // Para híbridos plug-in
  kmLEstrada?: number; // Para híbridos plug-in
  isPlugInHybrid?: boolean; // Identifica se é híbrido plug-in
}

export const volvoVehicles: VolvoVehicle[] = [
  {
    id: 'ex30',
    name: 'EX30',
    displayName: 'Volvo EX30',
    batteryCapacity: 65,
    autonomy: 338,
    priceRange: '220-300k',
    image: ex30Image,
    category: 'linha30'
  },
  {
    id: 'ec40',
    name: 'EC40',
    displayName: 'Volvo EC40',
    batteryCapacity: 79,
    autonomy: 404,
    priceRange: '300-400k',
    image: ec40Image,
    category: 'linha40'
  },
  {
    id: 'xc40',
    name: 'XC40',
    displayName: 'Volvo EX40',
    batteryCapacity: 79,
    autonomy: 393,
    priceRange: '300-400k',
    image: xc40Image,
    category: 'linha40'
  },
  {
    id: 'xc60',
    name: 'XC60',
    displayName: 'Volvo XC60 PHEV',
    batteryCapacity: 18.8,
    autonomy: 48, // Autonomia elétrica
    priceRange: '460-540k',
    image: xc60Image,
    category: 'linha60',
    kmLCidade: 9.5, // Consumo em modo híbrido cidade
    kmLEstrada: 9.4, // Consumo em modo híbrido estrada
    isPlugInHybrid: true
  },
  {
    id: 'xc90',
    name: 'XC90',
    displayName: 'Volvo XC90 PHEV',
    batteryCapacity: 18.8,
    autonomy: 47, // Autonomia elétrica
    priceRange: '680-850k',
    image: xc90Image,
    category: 'linha90',
    kmLCidade: 9.4, // Consumo em modo híbrido cidade
    kmLEstrada: 9.3, // Consumo em modo híbrido estrada
    isPlugInHybrid: true
  },
  {
    id: 'ex90',
    name: 'EX90',
    displayName: 'Volvo EX90',
    batteryCapacity: 111,
    autonomy: 459,
    priceRange: '680-850k',
    image: ex90Image,
    category: 'linha90'
  }
];

export function getVolvoVehicle(id: string): VolvoVehicle | undefined {
  return volvoVehicles.find(v => v.id === id);
}
