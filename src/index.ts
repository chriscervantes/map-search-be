import { MapSearchResponse } from "./@type";
import { getPlaceAutocomplete } from "./map-api";

export async function getAutoCompleteDetails(
  address: string
): Promise<MapSearchResponse[]> {
  if (!address) {
    throw new Error("Invalid input");
  }

  return getPlaceAutocomplete({ address });
}
