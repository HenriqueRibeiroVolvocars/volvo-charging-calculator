export const PREMIUM_BRANDS = [
  'VOLVO',
  'BMW',
  'AUDI',
  'MERCEDES-BENZ',
  'LEXUS',
  'PORSCHE',
  'LAND ROVER',
  'JAGUAR',
  'TESLA',
  'GENESIS',
];

export const NATIONAL_BRANDS = [
  'FIAT',
  'VOLKSWAGEN',
  'RENAULT',
  'NISSAN',
  'TOYOTA',
  'HONDA',
  'HYUNDAI',
  'MITSUBISHI',
  'FORD',
  'JEEP',
  'RAM',
];

export const OTHER_BRANDS = [
  'BYD',
  'GWM',
  'CHERY',
  'JAC',
  'PEUGEOT',
  'CITROËN',
  'KIA',
  'SUBARU',
  'SUZUKI',
  'MINI',
];

/**
 * Ordena marcas por categorias: Premium > Nacional > Outras > Alfabético
 */
export function sortBrandsByTier(brands: string[]): string[] {
  const normalize = (brand: string) => brand.toUpperCase().trim();

  const premium = brands.filter(b => 
    PREMIUM_BRANDS.includes(normalize(b))
  );

  const national = brands.filter(b => 
    !PREMIUM_BRANDS.includes(normalize(b)) &&
    NATIONAL_BRANDS.includes(normalize(b))
  );

  const other = brands.filter(b => 
    !PREMIUM_BRANDS.includes(normalize(b)) &&
    !NATIONAL_BRANDS.includes(normalize(b)) &&
    OTHER_BRANDS.includes(normalize(b))
  );

  const remaining = brands
    .filter(b => 
      !PREMIUM_BRANDS.includes(normalize(b)) &&
      !NATIONAL_BRANDS.includes(normalize(b)) &&
      !OTHER_BRANDS.includes(normalize(b))
    )
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  return [...premium, ...national, ...other, ...remaining];
}
