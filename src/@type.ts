type Poi = { name: string; categorySet: string[]; categories: string[] };
type Coordinates = { lat: number; lon: number };

export type Address = {
  streetName: string;
  countrySecondarySubdivision: string;
  countrySubdivision: string;
  countrySubdivisionName: string;
  countrySubdivisionCode: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  placeId?: string;
  postalCode?: string;
  extendedPostalCode?: string;
  localName?: string;
  municipality?: string;
};

export type TomTomResponse = {
  summary: string;
  results: Result[];
};

export type Result = {
  type: string;
  id: string;
  score: number;
  info?: string;
  poi?: Poi;
  address: Address;
  position: Coordinates;
  viewport?: {
    topLeftPoint: Coordinates;
    topRightPoint?: Coordinates;
    btmRightPoint?: Coordinates;
  };
  entryPoints?: { type: string; position: Coordinates };
};

export type MapSearchResponse = {
  placeId: string;
  streetName: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
  localName?: string;
  municipality?: string;
};

export type Environment = {
  TOMTOM_API_KEY: string;
};

export type GetAutoCompleteRequest = {
  address: string;
  filterByCountry?: string;
  limit?: number;
};
