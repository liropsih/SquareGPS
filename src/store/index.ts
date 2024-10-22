import type { Marker } from "@/service/Backend";
import { createStore } from "vuex";
import Backend from "@/service/Backend";
import { onError } from "@/service/Toast";

interface State {
  markers: Marker[];
}

export default createStore<State>({
  state: {
    markers: [],
  },
  mutations: {
    setMarkers(state, markers: Marker[]) {
      state.markers = markers;
    },
    pushMarker(state, marker: Marker) {
      state.markers.push(marker);
    },
    updateMarker(state, marker: Marker) {
      const index = state.markers.findIndex(m => m.id === marker.id);
      if (index !== -1) {
        state.markers[index] = marker;
      }
    },
    removeMarker(state, id: Marker["id"]) {
      const index = state.markers.findIndex(marker => marker.id === id);
      if (index !== -1) {
        state.markers.splice(index, 1);
      }
    },
  },
  actions: {
    async loadMarkers({ commit }) {
      try {
        const markers = await Backend.getMarkers();
        commit("setMarkers", markers);
      } catch (error) {
        if (error instanceof Error) {
          onError(error.message);
        }
      }
    },
    async addMarker({ commit }, marker: Omit<Marker, "id" | "address">) {
      try {
        const newMarker = await Backend.addMarker(marker);
        commit("pushMarker", newMarker);
        return newMarker;
      } catch (error: unknown) {
        if (error instanceof Error) {
          onError(error.message);
        }
      }
    },
    async updateMarker({ commit }, marker: Omit<Marker, "address">) {
      try {
        const updatedMarker = await Backend.updateMarker(marker);
        commit("updateMarker", updatedMarker);
        return updatedMarker;
      } catch (error: unknown) {
        if (error instanceof Error) {
          onError(error.message);
        }
      }
    },
    async removeMarker({ commit }, id: Marker["id"]) {
      try {
        await Backend.removeMarker(id);
        commit("removeMarker", id);
      } catch (error) {
        if (error instanceof Error) {
          onError(error.message);
        }
      }
    },
  },
});
