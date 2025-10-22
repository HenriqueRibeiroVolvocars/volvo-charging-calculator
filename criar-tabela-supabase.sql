-- Script para criar a tabela competitor_vehicles no Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Criar a tabela
CREATE TABLE IF NOT EXISTS competitor_vehicles (
  id SERIAL PRIMARY KEY,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  km_l_cidade NUMERIC NOT NULL,
  km_l_estrada NUMERIC NOT NULL,
  tipo_combustivel TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Inserir dados de exemplo
INSERT INTO competitor_vehicles (marca, modelo, km_l_cidade, km_l_estrada, tipo_combustivel) VALUES
('Audi', 'A3 Sedan 2.0 TFSI', 9.7, 13.0, 'Gasolina'),
('BMW', '320i Sport GP', 10.7, 13.2, 'Gasolina'),
('Chevrolet', 'Equinox RS/Premier 1.5 turbo', 9.1, 11.2, 'Gasolina'),
('Chevrolet', 'S10 High Country 2.8 diesel', 9.4, 10.9, 'Diesel'),
('Fiat', 'Titano 2.2 (manual)', 9.6, 9.6, 'Diesel'),
('Fiat', 'Titano 2.2 (automática)', 8.5, 9.2, 'Diesel'),
('Ford', 'Bronco Sport 2.0', 8.6, 10.5, 'Gasolina'),
('Ford', 'Maverick 2.0 turbo', 8.5, 11.4, 'Gasolina'),
('Ford', 'Ranger 2.2 diesel', 9.5, 10.7, 'Diesel'),
('Jeep', 'Compass T270', 10.5, 12.1, 'Gasolina'),
('Jeep', 'Compass TD350', 10.3, 13.5, 'Diesel'),
('Jeep', 'Commander turbodiesel', 10.3, 12.9, 'Diesel'),
('Mercedes-Benz', 'CLA 200', 12.3, 14.4, 'Gasolina'),
('Mercedes-Benz', 'GLA 200', 10.4, 14.0, 'Gasolina'),
('Mitsubishi', 'Eclipse Cross 1.5 turbo', 11.4, 11.4, 'Gasolina'),
('Mitsubishi', 'L200 Triton (manual)', 10.5, 12.5, 'Diesel'),
('Mitsubishi', 'L200 Triton (automática)', 9.3, 10.3, 'Diesel'),
('Nissan', 'Frontier 2.5', 10.5, 12.5, 'Diesel'),
('Nissan', 'Frontier LE 2.3', 8.9, 10.5, 'Diesel'),
('Peugeot', '3008 THP 1.6 turbo', 10.2, 13.8, 'Gasolina'),
('Ram', 'Rampage 2.2 diesel', 11.9, 11.9, 'Diesel'),
('Toyota', 'Hilux 2.8 turbodiesel', 9.4, 12.4, 'Diesel'),
('Volkswagen', 'Jetta GLI 350 TSI', 9.9, 12.5, 'Gasolina'),
('Audi', 'Q3 2.0 TFSI 2024', 8.0, 10.1, 'Gasolina'),
('BMW', 'X1 sDrive18i', 11.4, 13.5, 'Gasolina'),
('BMW', 'X1 sDrive20i X-Line', 10.7, 13.0, 'Gasolina'),
('BMW', '320i 2025', 10.8, 15.8, 'Gasolina'),
('Chevrolet', 'Trailblazer', 9.2, 11.2, 'Diesel'),
('Honda', 'Accord 2025 Hybrid', 17.6, 15.1, 'Híbrido'),
('Land Rover', 'Discovery Sport D200', 13.0, 13.0, 'Diesel'),
('Mercedes-Benz', 'C200 AMG Line 2025', 11.4, 14.7, 'Gasolina'),
('Mitsubishi', 'Pajero Sport 2.4TDi', 8.9, 11.7, 'Diesel'),
('Toyota', 'SW4 diesel', 9.0, 10.5, 'Diesel'),
('Toyota', 'Camry Hybrid', 21.7, 22.4, 'Híbrido'),
('Volkswagen', 'Amarok 2025', 8.7, 9.3, 'Diesel'),
('BMW', 'X4 xDrive30i M Sport', 9.0, 11.0, 'Gasolina'),
('Mercedes-Benz', 'GLC 300', 9.6, 11.9, 'Gasolina'),
('Mercedes-Benz', 'GLC 300 Coupé', 8.3, 10.1, 'Gasolina'),
('Range Rover', 'Evoque R-Dynamic HSE', 8.2, 10.4, 'Gasolina'),
('Range Rover', 'Evoque R-Dynamic HSE Etanol', 5.4, 7.1, 'Etanol'),
('Land Rover', 'Defender 90 D300 HSE', 11.6, 11.9, 'Diesel'),
('Land Rover', 'Defender 110 D300', 9.9, 11.4, 'Diesel'),
('BMW', 'X6 xDrive40i', 7.8, 9.6, 'Gasolina'),
('Mercedes-Benz', 'GLE 400d', 8.7, 12.6, 'Diesel'),
('Audi', 'Q8 Performance Black', 7.1, 10.5, 'Gasolina'),
('Porsche', '718 Cayman GTS 4.0', 5.5, 9.0, 'Gasolina');

-- 3. Verificar se os dados foram inseridos
SELECT COUNT(*) as total_vehicles FROM competitor_vehicles;

-- 4. Ver alguns exemplos
SELECT * FROM competitor_vehicles LIMIT 5;
