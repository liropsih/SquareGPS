import type { LatLng } from "leaflet";
import { v4 as uuidv4 } from "uuid";
import { getAddress } from "./Geocode";
import i18n from "@/plugins/i18n";

export interface Marker {
  id: string;
  latitude: LatLng["lat"];
  longitude: LatLng["lng"];
  address: string;
}

class Backend {
  private async saveMarkers(markers: Marker[]) {
    return new Promise(resolve => {
      localStorage.setItem("markers", JSON.stringify(markers));
      resolve(true);
    });
  }
  async getMarkers(): Promise<Marker[]> {
    return new Promise(resolve => {
      const stringMarkers = localStorage.getItem("markers");
      if (stringMarkers) {
        resolve(JSON.parse(stringMarkers));
      } else {
        resolve([]);
      }
    });
  }
  async addMarker(
    marker: Omit<Marker, "id" | "address">,
  ): Promise<Marker | Error> {
    try {
      const address = await getAddress(marker.latitude, marker.longitude);
      if (!address || typeof address !== "string") {
        throw new Error(i18n.global.t("backend.error.addressNotFound"));
      }
      const id = uuidv4();
      const markerItem = { id, address, ...marker };
      const markers = await this.getMarkers();
      markers.push(markerItem);
      await this.saveMarkers(markers);
      return markerItem;
    } catch (error) {
      throw error;
    }
  }
  async updateMarker(marker: Omit<Marker, "address">): Promise<Marker | Error> {
    try {
      const address = await getAddress(marker.latitude, marker.longitude);
      if (!address || typeof address !== "string") {
        throw new Error(i18n.global.t("backend.error.addressNotFound"));
      }
      const markerItem = { address, ...marker };
      const markers = await this.getMarkers();
      const index = markers.findIndex(m => m.id === markerItem.id);
      if (index !== -1) {
        markers[index] = markerItem;
      } else {
        throw new Error(i18n.global.t("backend.error.markerNotFound"));
      }
      await this.saveMarkers(markers);
      return markerItem;
    } catch (error) {
      throw error;
    }
  }
  async removeMarker(id: Marker["id"]) {
    const markers = await this.getMarkers();
    const index = markers.findIndex(marker => marker.id === id);
    if (index !== -1) {
      markers.splice(index, 1);
      await this.saveMarkers(markers);
    } else {
      throw new Error(i18n.global.t("backend.error.markerNotFound"));
    }
  }
}

export default new Backend();
