import * as fs from "fs";
import { config } from "dotenv";
import { describe } from "@jest/globals";
import { getPlaceAutocomplete, transformReponse } from "../src/map-api";
import { MapSearchResponse } from "../src/@type";
import { getAutoCompleteDetails } from "../src/index";
import { testData } from "./testData";
import uniqby from "lodash.uniqby";

config();
let environment = process.env;
// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
  describe("getAutoCompleteDetail", () => {
    it("should get only AU addresses in the response", async () => {
      const response = await getAutoCompleteDetails("Pitts Street");

      expect(response.length).toBeGreaterThan(0);
      const auAddress = uniqby(response, "AU");
      expect(auAddress.length).toEqual(1);
    });

    it("should throw an error if address is missing", async () => {
      await expect(getAutoCompleteDetails).rejects.toThrow(
        new Error("Invalid input")
      );
    });
  });

  describe("getPlaceAutocomplete", () => {
    it("returns a promise", () => {
      const res = getPlaceAutocomplete({ address: "Charlotte Street" });
      expect(res).toBeInstanceOf(Promise);
    });

    it("can fetch from the autocomplete api", async () => {
      const response: MapSearchResponse[] = await getPlaceAutocomplete({
        address: "Charlotte Street",
      });
      expect(response.length).toBeGreaterThan(0);

      response.forEach((res: MapSearchResponse) => {
        expect(res).toHaveProperty("placeId");
        expect(res).toHaveProperty("streetName");
        expect(res).toHaveProperty("freeformAddress");
        expect(res).toHaveProperty("countryCode");
        expect(res).toHaveProperty("country");
      });
    });
    it("handles no results", async () => {
      const res = await getPlaceAutocomplete({ address: "asfasffasfasafsafs" });
      expect(res).toEqual([]);
    });

    it("handles error", async () => {
      await expect(getPlaceAutocomplete({ address: "" })).rejects.toThrow(
        new Error("Request failed with status code 400")
      );
    });
  });

  describe("transformResponse", () => {
    it("should transform the filtered ALPI resultsk", () => {
      const transformedReponse = transformReponse(testData);

      transformedReponse.forEach((res: MapSearchResponse) => {
        expect(res).toHaveProperty("placeId");
        expect(typeof res.placeId).toBe("string");
        expect(res).toHaveProperty("streetName");
        expect(typeof res.streetName).toBe("string");
        expect(res).toHaveProperty("freeformAddress");
        expect(typeof res.freeformAddress).toBe("string");
        expect(res).toHaveProperty("countryCode");
        expect(typeof res.countryCode).toBe("string");
        expect(res).toHaveProperty("country");
        expect(typeof res.country).toBe("string");
      });
    });
  });
});
