<template>
  <v-responsive>
    <v-app>
      <VSonner position="top-right" :duration="2000" />
      <Header
        :show-navbar-button="hasNavbar && $vuetify.display.smAndDown"
        @toggle-navbar="navbarVisible = !navbarVisible"
      />
      <v-navigation-drawer
        v-if="hasNavbar"
        v-model="navbarVisible"
        :permanent="$vuetify.display.mdAndUp"
        :temporary="$vuetify.display.smAndDown"
        :width="$vuetify.display.mdAndUp ? 300 : undefined"
        mobile-breakpoint="sm"
      >
        <RouterView name="navbar" />
      </v-navigation-drawer>
      <v-main>
        <RouterView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Header from "@/components/header/Header.vue";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import { VSonner } from "vuetify-sonner";

const route = useRoute();
const display = useDisplay();

const navbarVisible = ref(display.mdAndUp.value);

const hasNavbar = computed(() =>
  route.matched.some(record => record.components?.navbar),
);
</script>
