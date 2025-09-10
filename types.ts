
export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  type: 'Residential' | 'Commercial';
  imageUrl: string;
  description: string;
  fullPrice: number;
  minShare: number;
  yield: number;
  details: {
    bedrooms?: number;
    bathrooms?: number;
    area: number;
  };
}

export enum Language {
  EN = 'en',
  FR = 'fr',
  RU = 'ru',
  PT = 'pt',
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
