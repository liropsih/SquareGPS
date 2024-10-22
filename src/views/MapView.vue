<template>
  <v-container
    fluid
    class="map-container fill-height"
    :class="{ editing }"
    v-click-outside="() => (editing = false)"
  >
    <LMap
      v-if="!loading"
      id="map"
      v-model:zoom="zoom"
      :center="
        activeMarker
          ? [activeMarker.latitude, activeMarker.longitude]
          : defaultLocation
      "
      :useGlobalLeaflet="false"
      @click="addMarker"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <LMarker
        v-for="(marker, index) in markers"
        :key="marker.id"
        :ref="
          el => (markerRefs[marker.id] = el as InstanceType<typeof LMarker>)
        "
        :lat-lng="[marker.latitude, marker.longitude]"
        :draggable="editing"
        @click="selectMarker(marker.id)"
        @dragend="event => updateMarker(marker.id, event)"
      >
        <LIcon
          :icon-url="
            marker.id === activeMarker?.id ? activeMarkerIcon : markerIcon
          "
          :icon-size="iconSize"
          class-name="marker-icon"
        />
        <LPopup @ready="marker.id === activeMarker?.id && openPopup(marker.id)">
          <b>{{ $t("markers.markerTitle", [index + 1]) }}</b>
          <div>{{ marker.address }}</div>
        </LPopup>
      </LMarker>
    </LMap>
    <v-fab
      icon="mdi-plus"
      location="bottom right"
      absolute
      :color="editing ? 'secondary' : 'primary'"
      @click.stop="editing = !editing"
    />
  </v-container>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import markerIcon from "@/assets/icons/marker/marker.svg";
import activeMarkerIcon from "@/assets/icons/marker/marker-active.svg";
import type { LatLng, PointExpression } from "leaflet";
import type { Marker } from "@/service/Backend";

const store = useStore();

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const editing = ref(false);
const zoom = ref(16);
const markers = computed<Marker[]>(() => store.state.markers);
const markerRefs = ref<Record<Marker["id"], InstanceType<typeof LMarker>>>({});
const iconSize = [25, 41] as PointExpression;

const activeMarker = computed<Marker | null>(() => {
  if ("id" in route.params) {
    return markers.value.find(marker => marker.id === route.params.id) || null;
  }
  return null;
});

const defaultLocation = [51.505, -0.09] as [LatLng["lat"], LatLng["lng"]];

const addMarker = (event: { latlng: LatLng }) => {
  if (!editing.value) return;
  store
    .dispatch("addMarker", {
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    })
    .then((marker: Marker) => selectMarker(marker.id));
  editing.value = false;
};

const updateMarker = (
  id: Marker["id"],
  event: { target: { getLatLng: () => LatLng } },
) => {
  if (!editing.value) return;
  const { lat, lng } = event.target.getLatLng();
  store.dispatch("updateMarker", {
    id,
    latitude: lat,
    longitude: lng,
  });
};

const selectMarker = (id: Marker["id"]) => {
  if (editing.value) return;
  return router.push({ name: "map", params: { id } });
};

const openPopup = (id: Marker["id"]) => {
  if (editing.value) return;
  markerRefs.value[id]?.leafletObject?.openPopup();
};

store
  .dispatch("loadMarkers")
  .then(() => {
    if (!activeMarker.value && markers.value.length) {
      return selectMarker(markers.value[0].id);
    }
  })
  .finally(() => {
    loading.value = false;
  });

watch(
  () => activeMarker.value,
  value => {
    if (value) {
      openPopup(value.id);
    }
  },
);

onBeforeUnmount(() => {
  store.commit("setMarkers", []);
});
</script>

<style lang="scss">
#map {
  width: 100%;
  height: 100%;
}
.map-container {
  .v-fab__container {
    right: 1rem;
    bottom: 2rem;
    z-index: 402;
    transition: all 0.1s ease-in-out;
  }
  .marker-icon {
    margin-top: -40px !important;
  }
  .leaflet-popup {
    bottom: 18px !important;
  }
  &.editing {
    #map {
      cursor: crosshair;
    }
    .v-fab__container {
      rotate: 45deg;
    }
  }
}
</style>
