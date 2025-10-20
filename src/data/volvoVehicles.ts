export interface VolvoVehicle {
  id: string;
  name: string;
  displayName: string;
  batteryCapacity: number; // kWh
  autonomy: number; // km INMETRO
  priceRange: string;
  image: string;
  category: 'linha30' | 'linha40' | 'linha60' | 'linha90';
}

export const volvoVehicles: VolvoVehicle[] = [
  {
    id: 'ex30',
    name: 'EX30',
    displayName: 'Volvo EX30',
    batteryCapacity: 65,
    autonomy: 338,
    priceRange: '220-300k',
    image: '01-EX30.png',
    category: 'linha30'
  },
  {
    id: 'ec40',
    name: 'EC40',
    displayName: 'Volvo EC40',
    batteryCapacity: 79,
    autonomy: 404,
    priceRange: '300-400k',
    image: '02-EC40.png',
    category: 'linha40'
  },
  {
    id: 'xc40',
    name: 'XC40',
    displayName: 'Volvo XC40 Recharge',
    batteryCapacity: 79,
    autonomy: 393,
    priceRange: '300-400k',
    image: '03-XC40.png',
    category: 'linha40'
  },
  {
    id: 'xc60',
    name: 'XC60',
    displayName: 'Volvo XC60 PHEV',
    batteryCapacity: 18.8,
    autonomy: 85,
    priceRange: '460-540k',
    image: '04-XC60.png',
    category: 'linha60'
  },
  {
    id: 'xc90',
    name: 'XC90',
    displayName: 'Volvo XC90 PHEV',
    batteryCapacity: 18.8,
    autonomy: 85,
    priceRange: '680-850k',
    image: '05-XC90.png',
    category: 'linha90'
  },
  {
    id: 'ex90',
    name: 'EX90',
    displayName: 'Volvo EX90',
    batteryCapacity: 111,
    autonomy: 459,
    priceRange: '680-850k',
    image: '06-EX90.png',
    category: 'linha90'
  }
];

export function getVolvoVehicle(id: string): VolvoVehicle | undefined {
  return volvoVehicles.find(v => v.id === id);
}
