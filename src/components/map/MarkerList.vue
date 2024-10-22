<template>
  <v-list lines="three" class="marker-list">
    <v-list-item :title="$t('markers.title')" class="marker-list__title" />
    <v-divider />
    <template v-if="markers.length">
      <v-list-item
        v-for="(marker, index) in markers"
        :key="marker.id"
        :ref="
          el => (listItemRefs[marker.id] = el as InstanceType<typeof VListItem>)
        "
        :title="$t('markers.markerTitle', [index + 1])"
        :to="{ name: 'map', params: { id: marker.id } }"
        :subtitle="marker.address"
        class="marker-list__item"
        color="primary"
        link
      >
        <template v-slot:append>
          <div class="marker-list__item__remove">
            <v-btn
              size="small"
              variant="text"
              icon="mdi-close"
              @click.prevent="showRemoveMarkerDialog(marker)"
            />
          </div>
        </template>
      </v-list-item>
    </template>
    <v-list-item v-else :subtitle="$t('markers.empty')" />
  </v-list>
  <RemoveMarkerDialog
    v-model="removeMarkerDialog"
    @confirm="removeItem(removeMarkerInfo!.id)"
    @update:model-value="onDialogModelUpdate"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { VListItem } from "vuetify/components";
import type { Marker } from "@/service/Backend";
import RemoveMarkerDialog from "@/components/map/RemoveMarkerDialog.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const markers = computed<Marker[]>(() => store.state.markers);
const listItemRefs = ref<Record<Marker["id"], InstanceType<typeof VListItem>>>(
  {},
);

const removeMarkerDialog = ref(false);
const removeMarkerInfo = ref<Marker | null>(null);

const showRemoveMarkerDialog = (marker: Marker) => {
  removeMarkerDialog.value = true;
  removeMarkerInfo.value = marker;
};
const onDialogModelUpdate = (value: boolean) => {
  if (!value) {
    removeMarkerInfo.value = null;
  }
};
const removeItem = (id: Marker["id"]) => {
  if (removeMarkerInfo.value) {
    store.dispatch("removeMarker", id).then(() => {
      removeMarkerDialog.value = false;
      removeMarkerInfo.value = null;
      if (route.params.id === id && markers.value.length) {
        router.push({
          name: "map",
          params: {
            id: markers.value.length ? markers.value[0].id : undefined,
          },
        });
      }
    });
  }
};

watch(
  () => route.params.id,
  id => {
    if (id && typeof id === "string") {
      listItemRefs.value[id]?.$el?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  },
);
</script>

<style lang="scss">
.marker-list {
  &__title {
    .v-list-item-title {
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  &__item {
    .v-list-item__title {
      font-size: 0.9rem;
    }
    &__remove {
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
    }
    &:not(:hover) &__remove {
      display: none;
    }
  }
}
</style>
