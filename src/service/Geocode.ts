import axios from "axios";
import type { LatLng } from "leaflet";
export const getAddress = async (
  lat: LatLng["lat"],
  lon: LatLng["lng"],
): Promise<string | Error> => {
  try {
    const { data } = await axios.get("https://geocode.maps.co/reverse", {
      params: {
        lat,
        lon,
        api_key: import.meta.env.VITE_APP_GEOCODE_API_KEY,
      },
    });
    return data.display_name;
  } catch (error) {
    throw error;
  }
};
