import axios from "axios";
import {
  Result,
  MapSearchResponse,
  TomTomResponse,
  Environment,
  GetAutoCompleteRequest,
} from "./@type";

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
/**
 * This function will fetch the map search, filter the response that it only returns AU address
 *
 * @param address: address to search, if this is an empty string it will return all the address and it will have implication to the search performance.
 * @param filterByCountry: by default it will filter by AU
 * @param limit: by default it will limit the fetch record to 100
 * @returns
 *  MapSearchResponse:
 *  { placeId, country, countryCode, streetName, freeformAddress, localName, municipality }
 */
export async function getPlaceAutocomplete({
  address,
  filterByCountry = "AU",
  limit = 100,
}: GetAutoCompleteRequest): Promise<MapSearchResponse[] | []> {
  const { TOMTOM_API_KEY } = process.env as Environment;

  if (!TOMTOM_API_KEY) {
    throw new Error("missing api key");
  }

  try {
    const axiosResponse = await axios.get<TomTomResponse>(
      `https://api.tomtom.com/search/2/search/${address}.json`,
      {
        params: {
          key: TOMTOM_API_KEY,
          limit,
        },
      }
    );

    const { results: searchResults } = axiosResponse.data;

    const filteredAddress = searchResults.filter(
      (searchResult: Result) =>
        searchResult.address.countryCode === filterByCountry
    );

    const response: MapSearchResponse[] = transformReponse(filteredAddress);

    return response;
  } catch (e: unknown) {
    const error = e as Error;
    throw new Error(error.message);
  }
}

export function transformReponse(data: Result[]): MapSearchResponse[] {
  return data.map((e: Result) => {
    return {
      placeId: e.id,
      streetName: e.address.streetName,
      freeformAddress: e.address.freeformAddress,
      localName: e.address?.localName,
      municipality: e.address?.municipality,
      countryCode: e.address.countryCode,
      country: e.address.country,
    };
  });
}
