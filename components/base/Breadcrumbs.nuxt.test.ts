import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineNuxtComponent } from '#imports'
import Breadcrumbs from './Breadcrumbs.vue'

// Mock du composant NuxtLink
const NuxtLinkStub = defineNuxtComponent({
  name: 'NuxtLink',
  props: ['to'],
  template: '<a :href="to"><slot /></a>'
})

describe('Breadcrumbs', () => {
  const mountOptions = {
    global: {
      stubs: {
        NuxtLink: NuxtLinkStub
      }
    }
  }

  test('renders nothing when items array is empty', () => {
    const wrapper = mount(Breadcrumbs, {
      props: {
        items: []
      },
      ...mountOptions
    })
    expect(wrapper.find('nav').exists()).toBe(false)
  })
  
  test('renders breadcrumbs with correct items', () => {
    const items = [
      { label: 'Page 1', to: '/page1' },
      { label: 'Page 2', to: '/page1/page2' }
    ]
    const wrapper = mount(Breadcrumbs, {
      props: {
        items
      },
      ...mountOptions
    })
    console.log(wrapper.html(), 'wrapper.html()')

    // Vérifie que le composant est rendu
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)

    // Vérifie que le lien "Accueil" est présent
    const homeLink = wrapper.find('a')
    expect(homeLink.exists()).toBe(true)
    expect(homeLink.text()).toBe('Accueil')

    // Vérifie que les liens sont correctement rendus
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(2) // Accueil + Page 1

    // Vérifie que le dernier élément est un span (non cliquable)
    const lastItem = wrapper.find('span[aria-current="page"]')
    expect(lastItem.exists()).toBe(true)
    expect(lastItem.text()).toBe('Page 2')
  })
}) 
