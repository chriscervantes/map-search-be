import axios from "axios";
import { Result, Response, Environment, TomTomResponse } from "./@type";
import { TomTomClient } from "./httpClient";

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  address: string
): Promise<Response[] | []> {
  const { TOMTOM_API_KEY, Limit } = process.env;

  if (!TOMTOM_API_KEY) {
    throw new Error("missing api key");
  }

  try {
    const axiosResponse = await axios.get<TomTomResponse>(
      `https://api.tomtom.com/search/2/search/${address}.json`,
      {
        params: {
          key: TOMTOM_API_KEY,
          limit: Limit,
        },
      }
    );

    const { results } = axiosResponse.data;

    const auAddress = results.filter(
      (result: Result) => result.address.countryCode === "AU"
    );

    const response: Response[] = transformReponse(auAddress);

    return response;
  } catch (error: unknown) {
    const e = error as Error;
    throw new Error(
      `Error completing getPlaceAutocomplete process ${JSON.stringify(
        e,
        null,
        3
      )}`
    );
  }
}

function transformReponse(data: Result[]): Response[] {
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
