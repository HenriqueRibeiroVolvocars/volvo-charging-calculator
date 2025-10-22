export interface CompetitorVehicle {
  marca: string;
  modelo: string;
  kmLCidade: number;
  kmLEstrada: number;
  tipoCombustivel: 'Gasolina' | 'Diesel' | 'Etanol' | 'Flex' | 'Híbrido';
  faixaPreco: string;
  linha: 'linha30' | 'linha40' | 'linha60' | 'linha90';
}

export const competitorVehicles: CompetitorVehicle[] = [
  // Linha 30 (220-300k)
  { marca: 'Audi', modelo: 'A3 Sedan 2.0 TFSI', kmLCidade: 9.7, kmLEstrada: 13, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'BMW', modelo: '320i Sport GP', kmLCidade: 10.7, kmLEstrada: 13.2, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Chevrolet', modelo: 'Equinox RS/Premier 1.5 turbo', kmLCidade: 9.1, kmLEstrada: 11.2, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Chevrolet', modelo: 'S10 High Country 2.8 diesel', kmLCidade: 9.4, kmLEstrada: 10.9, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Fiat', modelo: 'Titano 2.2 (manual)', kmLCidade: 9.6, kmLEstrada: 9.6, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Fiat', modelo: 'Titano 2.2 (automática)', kmLCidade: 8.5, kmLEstrada: 9.2, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Ford', modelo: 'Bronco Sport 2.0', kmLCidade: 8.6, kmLEstrada: 10.5, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Ford', modelo: 'Maverick 2.0 turbo', kmLCidade: 8.5, kmLEstrada: 11.4, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Ford', modelo: 'Ranger 2.2 diesel', kmLCidade: 9.5, kmLEstrada: 10.7, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Jeep', modelo: 'Compass T270', kmLCidade: 10.5, kmLEstrada: 12.1, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Jeep', modelo: 'Compass TD350', kmLCidade: 10.3, kmLEstrada: 13.5, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Jeep', modelo: 'Commander turbodiesel', kmLCidade: 10.3, kmLEstrada: 12.9, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Mercedes-Benz', modelo: 'CLA 200', kmLCidade: 12.3, kmLEstrada: 14.4, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Mercedes-Benz', modelo: 'GLA 200', kmLCidade: 10.4, kmLEstrada: 14, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Mitsubishi', modelo: 'Eclipse Cross 1.5 turbo', kmLCidade: 11.4, kmLEstrada: 11.4, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Mitsubishi', modelo: 'L200 Triton (manual)', kmLCidade: 10.5, kmLEstrada: 12.5, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Mitsubishi', modelo: 'L200 Triton (automática)', kmLCidade: 9.3, kmLEstrada: 10.3, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Nissan', modelo: 'Frontier 2.5', kmLCidade: 10.5, kmLEstrada: 12.5, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Nissan', modelo: 'Frontier LE 2.3', kmLCidade: 8.9, kmLEstrada: 10.5, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Peugeot', modelo: '3008 THP 1.6 turbo', kmLCidade: 10.2, kmLEstrada: 13.8, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Ram', modelo: 'Rampage 2.2 diesel', kmLCidade: 11.9, kmLEstrada: 11.9, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Toyota', modelo: 'Hilux 2.8 turbodiesel', kmLCidade: 9.4, kmLEstrada: 12.4, tipoCombustivel: 'Diesel', faixaPreco: '220-300k', linha: 'linha30' },
  { marca: 'Volkswagen', modelo: 'Jetta GLI 350 TSI', kmLCidade: 9.9, kmLEstrada: 12.5, tipoCombustivel: 'Gasolina', faixaPreco: '220-300k', linha: 'linha30' },

  // Linha 40 (300-400k)
  { marca: 'Audi', modelo: 'Q3 2.0 TFSI 2024', kmLCidade: 8, kmLEstrada: 10.1, tipoCombustivel: 'Gasolina', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'BMW', modelo: 'X1 sDrive18i', kmLCidade: 11.4, kmLEstrada: 13.5, tipoCombustivel: 'Gasolina', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'BMW', modelo: 'X1 sDrive20i X-Line', kmLCidade: 10.7, kmLEstrada: 13, tipoCombustivel: 'Gasolina', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'BMW', modelo: '320i 2025', kmLCidade: 10.8, kmLEstrada: 15.8, tipoCombustivel: 'Gasolina', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'Chevrolet', modelo: 'Trailblazer', kmLCidade: 9.2, kmLEstrada: 11.2, tipoCombustivel: 'Diesel', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'Honda', modelo: 'Accord 2025 Hybrid', kmLCidade: 17.6, kmLEstrada: 15.1, tipoCombustivel: 'Híbrido', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'Land Rover', modelo: 'Discovery Sport D200', kmLCidade: 13, kmLEstrada: 13, tipoCombustivel: 'Diesel', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'Mercedes-Benz', modelo: 'C200 AMG Line 2025', kmLCidade: 11.4, kmLEstrada: 14.7, tipoCombustivel: 'Gasolina', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'Mitsubishi', modelo: 'Pajero Sport 2.4TDi', kmLCidade: 8.9, kmLEstrada: 11.7, tipoCombustivel: 'Diesel', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'Toyota', modelo: 'SW4 diesel', kmLCidade: 9, kmLEstrada: 10.5, tipoCombustivel: 'Diesel', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'Toyota', modelo: 'Camry Hybrid', kmLCidade: 21.7, kmLEstrada: 22.4, tipoCombustivel: 'Híbrido', faixaPreco: '300-400k', linha: 'linha40' },
  { marca: 'Volkswagen', modelo: 'Amarok 2025', kmLCidade: 8.7, kmLEstrada: 9.3, tipoCombustivel: 'Diesel', faixaPreco: '300-400k', linha: 'linha40' },

  // Linha 60 (460-540k)
  { marca: 'BMW', modelo: 'X4 xDrive30i M Sport', kmLCidade: 9, kmLEstrada: 11, tipoCombustivel: 'Gasolina', faixaPreco: '460-540k', linha: 'linha60' },
  { marca: 'Mercedes-Benz', modelo: 'GLC 300', kmLCidade: 9.6, kmLEstrada: 11.9, tipoCombustivel: 'Gasolina', faixaPreco: '460-540k', linha: 'linha60' },
  { marca: 'Mercedes-Benz', modelo: 'GLC 300 Coupé', kmLCidade: 8.3, kmLEstrada: 10.1, tipoCombustivel: 'Gasolina', faixaPreco: '460-540k', linha: 'linha60' },
  { marca: 'Range Rover', modelo: 'Evoque R-Dynamic HSE', kmLCidade: 8.2, kmLEstrada: 10.4, tipoCombustivel: 'Gasolina', faixaPreco: '460-540k', linha: 'linha60' },
  { marca: 'Range Rover', modelo: 'Evoque R-Dynamic HSE Etanol', kmLCidade: 5.4, kmLEstrada: 7.1, tipoCombustivel: 'Etanol', faixaPreco: '460-540k', linha: 'linha60' },

  // Linha 90 (680-850k)
  { marca: 'Land Rover', modelo: 'Defender 90 D300 HSE', kmLCidade: 11.6, kmLEstrada: 11.9, tipoCombustivel: 'Diesel', faixaPreco: '680-850k', linha: 'linha90' },
  { marca: 'Land Rover', modelo: 'Defender 110 D300', kmLCidade: 9.9, kmLEstrada: 11.4, tipoCombustivel: 'Diesel', faixaPreco: '680-850k', linha: 'linha90' },
  { marca: 'BMW', modelo: 'X6 xDrive40i', kmLCidade: 7.8, kmLEstrada: 9.6, tipoCombustivel: 'Gasolina', faixaPreco: '680-850k', linha: 'linha90' },
  { marca: 'Mercedes-Benz', modelo: 'GLE 400d', kmLCidade: 8.7, kmLEstrada: 12.6, tipoCombustivel: 'Diesel', faixaPreco: '680-850k', linha: 'linha90' },
  { marca: 'Audi', modelo: 'Q8 Performance Black', kmLCidade: 7.1, kmLEstrada: 10.5, tipoCombustivel: 'Gasolina', faixaPreco: '680-850k', linha: 'linha90' },
  { marca: 'Porsche', modelo: '718 Cayman GTS 4.0', kmLCidade: 5.5, kmLEstrada: 9, tipoCombustivel: 'Gasolina', faixaPreco: '680-850k', linha: 'linha90' }
];

export function getCompetitorsByLine(linha: 'linha30' | 'linha40' | 'linha60' | 'linha90'): CompetitorVehicle[] {
  return competitorVehicles.filter(v => v.linha === linha);
}
