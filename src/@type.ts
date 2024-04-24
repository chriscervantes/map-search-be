type Poi = { name: string; categorySet: string[]; categories: string[] };
type Coordinates = { lat: string; lon: string };

export type Address = {
  placeId: string;
  streetName: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countrySubdivision: string;
  countrySubdivisionName: string;
  countrySubdivisionCode: string;
  postalCode: string;
  extendedPostalCode: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  localName: string;
};

export type TomTomResponse = {
  summary: string;
  results: Result[];
};

export type Result = {
  type: string;
  id: string;
  score: number;
  info: string;
  poi: Poi;
  address: Address;
  position: Coordinates;
  viewport: { topLeftPoint: Coordinates; topRightPoint: Coordinates };
  entryPoints: { type: string; position: Coordinates };
};

export type Response = {
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
  Limit: number;
};
