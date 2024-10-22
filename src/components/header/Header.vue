<template>
  <v-app-bar
    class="px-3"
    elevation="0"
    color="primary"
    density="compact"
    :image="image"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      />
    </template>
    <v-app-bar-nav-icon
      v-if="showNavbarButton"
      variant="text"
      @click.stop="emit('toggle-navbar')"
    />
    <v-app-bar-title>{{ t("header.title") }}</v-app-bar-title>
    <template v-slot:append>
      <LangMenu />
    </template>
    <template v-slot:extension>
      <Tabs />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import LangMenu from "./LangMenu.vue";
import Tabs from "./Tabs.vue";
import image from "@/assets/images/app-bar.png?url";

const { t } = useI18n();

const { showNavbarButton } = defineProps<{
  showNavbarButton?: boolean;
}>();

const emit = defineEmits<{
  "toggle-navbar": [];
}>();
</script>
