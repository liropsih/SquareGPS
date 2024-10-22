<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-web" variant="text" v-bind="props" />
    </template>
    <v-list>
      <v-list-item
        v-for="language in languages"
        :key="language.key"
        :active="language.key === locale"
        @click="setLocale(language.key)"
      >
        <v-list-item-title>{{ language.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useLocale } from "vuetify";

const { availableLocales, t, locale } = useI18n();
const { current: vuetifyLocale } = useLocale();

const languages = computed(() =>
  availableLocales.map(key => ({
    key,
    title: t(`locales.list.${key}`),
  })),
);

const setLocale = (key: string) => {
  locale.value = key;
  vuetifyLocale.value = key;
  localStorage.setItem("lang", key);
};
</script>
