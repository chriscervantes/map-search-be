import { config } from "dotenv";
import { describe } from "@jest/globals";
import { getPlaceAutocomplete } from "../src/map-api";
import { Response } from "../src/@type";

config();
let environment = process.env;
// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
  describe("getPlaceAutocomplete", () => {
    it("returns a promise", () => {
      const res = getPlaceAutocomplete("Charlotte Street");
      expect(res).toBeInstanceOf(Promise);
    });

    it("can fetch from the autocomplete api", async () => {
      const response: Response[] = await getPlaceAutocomplete(
        "Charlotte Street"
      );
      expect(response.length).toBeGreaterThan(0);

      response.forEach((res: Response) => {
        expect(res).toHaveProperty("placeId");
        expect(res).toHaveProperty("streetName");
        expect(res).toHaveProperty("freeformAddress");
        expect(res).toHaveProperty("countryCode");
        expect(res).toHaveProperty("country");
      });
    });
    it("handles no results", async () => {
      const res = await getPlaceAutocomplete("asfasffasfasafsafs");
      expect(res).toEqual([]);
    });

    it("handles error", async () => {
      await expect(getPlaceAutocomplete("")).rejects.toThrow();
    });
  });
});
