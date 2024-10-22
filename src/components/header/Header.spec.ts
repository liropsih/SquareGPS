import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import i18n from "@/plugins/i18n";
import vuetify from "@/plugins/vuetify";
import ResizeObserver from "resize-observer-polyfill";
import Header from "@/components/header/Header.vue";
import { nextTick } from "vue";
import router from "@/router";

global.ResizeObserver = ResizeObserver;

test("displays message", async () => {
  i18n.global.missing = (locale, key) => {
    throw new Error(
      `Missing translation for key "${key}" in locale "${locale}"`,
    );
  };
  const wrapper = mount(
    {
      template: "<v-layout><Header /></v-layout>",
    },
    {
      props: {},
      global: {
        components: {
          Header,
        },
        plugins: [i18n, vuetify, router],
      },
    },
  );
  for (const locale of i18n.global.availableLocales) {
    i18n.global.locale = locale;
    await nextTick();
    expect(wrapper.text()).toContain(i18n.global.t("header.title", locale));
  }
});
