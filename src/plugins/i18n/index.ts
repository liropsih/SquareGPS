import { createI18n } from "vue-i18n";
import messages from "./messages";

export const fallbackLocale = "en";
export const defaultLocale = localStorage.getItem("lang") || fallbackLocale;

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: fallbackLocale,
  messages,
});

export default i18n;
