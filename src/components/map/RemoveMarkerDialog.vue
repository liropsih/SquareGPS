<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    max-width="400"
  >
    <v-card>
      <v-card-title>{{ $t("markers.removeDialog.title") }}</v-card-title>
      <v-card-text>{{ $t("markers.removeDialog.message") }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="confirm">{{
          $t("markers.removeDialog.confirm")
        }}</v-btn>
        <v-btn color="red darken-1" variant="text" @click="close">{{
          $t("markers.removeDialog.cancel")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const { modelValue } = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "confirm"): void;
}>();

const confirm = () => {
  emit("confirm");
  close();
};
const close = () => emit("update:modelValue", false);
</script>
