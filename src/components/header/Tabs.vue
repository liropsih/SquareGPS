<template>
  <v-tabs
    :modelValue="activeTab"
    bg-color="transparent"
    color="basil"
    align-tabs="title"
  >
    <v-tab
      v-for="tab in tabs"
      :key="tab.routeName"
      :to="{ name: tab.routeName }"
      :text="tab.title"
      :value="route.name"
    />
  </v-tabs>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();

const tabs = computed(() => [
  { title: t("header.tabs.about"), routeName: "about" },
  { title: t("header.tabs.map"), routeName: "map" },
]);

const activeTab = computed(() => route.name);
</script>
