<template>
  <div>
    <Combobox v-model="selectedItems" multiple>
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm"
          :display-value="displayValue"
          @change="query = $event.target.value"
          :placeholder="placeholder"
        />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredItems.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Aucun résultat trouvé.
          </div>

          <ComboboxOption
            v-for="item in filteredItems"
            :key="item.id"
            :value="item"
            :disabled="isSelected(item)"
            as="template"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-pointer select-none py-2 pl-8 pr-4"
              :class="{
                'bg-amber-600 text-white': selected || active,
                'text-gray-900': !selected,
                'cursor-not-allowed': isSelected(item)
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ item.name }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-amber-600': selected }"
              >
                <CheckIcon class="h-5 w-5 text-white"  />
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
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

interface Item {
  id: number | string
  name: string
}

const props = withDefaults(defineProps<{
  modelValue: Item[]
  items: Item[]
  placeholder?: string
}>(), {
  placeholder: 'Sélectionnez des éléments...'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item[]): void
}>()

const query = ref('')
const selectedItems = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isSelected = (item: Item) => selectedItems.value.some(i => i.id === item.id)

const filteredItems = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)

function displayValue(item: unknown): string {
  if (Array.isArray(item)) {
    return (item as Item[]).map(i => i.name).join(', ')
  }
  return item as string
}
</script> 
