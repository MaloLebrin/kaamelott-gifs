<template>
<div>
  <Combobox
    v-model="selectedItems"
    multiple>
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="relative mt-1">
      <ComboboxInput
        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm"
        :display-value="displayValue"
        :placeholder="placeholder"
        @change="query = $event.target.value"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true" />
      </ComboboxButton>
    </div>
    <TransitionRoot
      leave="transition ease-in duration-100"
      leave-from="opacity-100"
      leave-to="opacity-0"
      @after-leave="query = ''"
    >
      <ComboboxOptions
        class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <li
          v-if="selectedItems.length > 0"
          class="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-500 hover:bg-gray-100"
          @click="clearSelection"
        >
          <span class="block truncate font-normal">Tout désélectionner</span>
        </li>
        <div
          v-if="filteredItems.length === 0 && query !== ''"
          class="relative cursor-default select-none py-2 px-4 text-gray-700"
        >
          Aucun résultat trouvé.
        </div>

        <ComboboxOption
          v-for="item in filteredItems"
          :key="item.id"
          v-slot="{ selected, active }"
          :value="item"
          as="template"
        >
          <li
            class="relative cursor-pointer select-none py-2 pl-10 pr-4"
            :class="{
              'bg-amber-600 text-white': selected || active,
              'text-gray-900': !selected,
            }"
          >
            <span
              class="block truncate"
              :class="{ 'font-medium': selected, 'font-normal': !selected }"
            >
              {{ item.name }}
            </span>
            <span
              v-if="isSelected(item)"
              class="absolute inset-y-0 left-0 flex items-center pl-3"
              :class="{ 'text-amber-600': selected }"
            >
              <CheckCircleIcon class="h-5 w-5 text-amber-600"  />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </TransitionRoot>
  </Combobox>
</div>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckCircleIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

interface Item {
  id: number | string
  name: string
}

const props = withDefaults(defineProps<{
  modelValue: Item[]
  items: Item[]
  placeholder?: string
  label?: string
}>(), {
  placeholder: 'Sélectionnez des éléments...',
  label: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item[]): void
}>()

const query = ref('')
const selectedItems = computed({
  get: () => props.modelValue,
  set: value => {
    if (isSelected(value[value.length - 1])) {
      const newValue = props.modelValue.filter(item => item.id !== value[value.length - 1].id)
      emit('update:modelValue', newValue)
    } else {
      emit('update:modelValue', value)
    }
  }
})

const isSelected = (item: Item) => selectedItems.value.some(i => i.id === item.id)

const filteredItems = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter(item =>
      item.name
        .toLocaleLowerCase()
        .replace(/\s+/gi, '')
        .includes(query.value.toLocaleLowerCase().replace(/\s+/gi, ''))
    )
)

function displayValue(item: unknown): string {
  if (Array.isArray(item)) {
    return (item as Item[]).map(i => i.name).join(', ')
  }
  return item as string
}

function clearSelection() {
  emit('update:modelValue', [])
}
</script> 
