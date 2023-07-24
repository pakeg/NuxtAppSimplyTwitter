<template>
  <div class="">
    <label
      for=""
      v-if="props.label"
      class="block pl-3 ml-2 text-sm font-medium text-gray-700"
      >{{ props.label }}</label
    >
    <div class="mt-1">
      <input
        :type="props.type"
        :value="props.modelValue"
        class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :placeholder="props.placeholder"
        @input="emits('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: null,
  },
});
</script>
