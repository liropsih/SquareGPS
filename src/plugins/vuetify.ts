import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { ru, en } from "vuetify/locale";
import { defaultLocale, fallbackLocale } from "./i18n";

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: defaultLocale,
    fallback: fallbackLocale,
    messages: { ru, en },
  },
});
