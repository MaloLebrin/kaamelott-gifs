<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      class="mt-1 block w-full px-1.5 py-0.5 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string;
  label?: string;
  id?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}>(), {
  rows: 3,
  id: '',
  placeholder: '',
  required: false
});

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script> 
