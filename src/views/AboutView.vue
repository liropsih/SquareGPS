<template>
  <v-container fluid>
    <LocaleAboutContent class="about-content">
      <template #example>
        <div class="example-image">
          <img src="@/assets/images/example.jpg" />
        </div>
      </template>
    </LocaleAboutContent>
  </v-container>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const LocaleAboutContent = computed(() => {
  const lang = locale.value;
  return defineAsyncComponent(
    () => import(`@/components/about/AboutContent.${lang}.vue`),
  );
});
</script>

<style lang="scss">
.about-content {
  margin: 0 auto;
  max-width: 768px;

  h1,
  h2 {
    font-weight: normal;
  }

  h1,
  h2,
  p,
  ol,
  .part {
    padding-bottom: 1rem;
  }

  ol {
    list-style-type: decimal;
    padding-left: 2rem;

    ol {
      list-style-type: lower-alpha;
    }
  }

  .example-image {
    img {
      object-fit: contain;
      width: 100%;
    }

    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
