import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCombobox from './BaseCombobox.vue'

const mockItems = [
  { id: 1, name: 'Arthur' },
  { id: 2, name: 'Perceval' },
  { id: 3, name: 'Karadoc' }
]

// Stubs pour les composants Headless UI
const HeadlessUIStubs = {
  Combobox: {
    template: '<div><slot /></div>',
    props: ['modelValue', 'multiple'],
    emits: ['update:modelValue']
  },
  ComboboxInput: {
    template: '<input :value="displayValue" :placeholder="placeholder" @input="$emit(\'change\', $event)" />',
    props: ['displayValue', 'placeholder'],
    emits: ['change']
  },
  ComboboxButton: {
    template: '<button><slot /></button>'
  },
  ComboboxOptions: {
    template: '<div><slot /></div>'
  },
  ComboboxOption: {
    template: '<div><slot /></div>',
    props: ['value'],
    emits: ['select']
  },
  TransitionRoot: {
    template: '<div><slot /></div>'
  }
}

describe('BaseCombobox', () => {
  const createWrapper = (props = {}) => {
    return mount(BaseCombobox, {
      props: {
        modelValue: [],
        items: mockItems,
        ...props
      },
      global: {
        stubs: HeadlessUIStubs
      }
    })
  }

  test('renders correctly with required props', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('input').exists()).toBe(true)
  })

  test('displays selected items', () => {
    const wrapper = createWrapper({
      modelValue: [mockItems[0]]
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('value')).toBe('Arthur')
  })

  test('emits update:modelValue when selecting an item', async () => {
    const wrapper = createWrapper()
    const combobox = wrapper.findComponent({ name: 'Combobox' })
    await combobox.vm.$emit('update:modelValue', [mockItems[0]])
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[mockItems[0]]])
  })

  test('displays placeholder when no items are selected', () => {
    const wrapper = createWrapper({
      placeholder: 'Test placeholder'
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Test placeholder')
  })

  test('handles input changes', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input')
    await input.setValue('Ar')
    await input.trigger('change')
    
    // Vérifier que l'événement change a été émis
    const comboboxInput = wrapper.findComponent({ name: 'ComboboxInput' })
    expect(comboboxInput.emitted('change')).toBeTruthy()
  })

  test('updates query when input changes', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input')
    await input.setValue('Ar')
    await input.trigger('change')
    expect(wrapper.vm.query).toBe('Ar')
  })

  test('filters items based on search query', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input')
    await input.setValue('Ar')
    await input.trigger('change')
    
    // Vérifier que les options filtrées sont affichées
    const options = wrapper.findAllComponents({ name: 'ComboboxOption' })
    expect(options.length).toBe(1)
  })

  test('displays no results message when no items match', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input')
    await input.setValue('NonExistent')
    await input.trigger('change')
    
    // Vérifier que le message "Aucun résultat trouvé" est affiché
    expect(wrapper.text()).toContain('Aucun résultat trouvé')
  })
}) 
