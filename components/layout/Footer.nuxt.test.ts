import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import Footer from './Footer.vue'


describe('Footer', () => {
  test('affiche correctement le copyright avec l\'année en cours', () => {
    const wrapper = mount(Footer)
    const currentYear = new Date().getFullYear()
    const copyrightText = wrapper.find('p')
    
    expect(copyrightText.exists()).toBe(true)
    expect(copyrightText.text()).toContain(currentYear.toString())
    expect(copyrightText.text()).toContain('Kaamelott GIFs')
    expect(copyrightText.text()).toContain('Tous droits réservés')
  })

  test('contient un lien GitHub avec les bons attributs', () => {
    const wrapper = mount(Footer)
    const githubLink = wrapper.find('a[href="https://github.com/MaloLebrin/kaamelott-gifs"]')
    
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('target')).toBe('_blank')
    expect(githubLink.attributes('rel')).toBe('noopener noreferrer')
    expect(githubLink.attributes('aria-label')).toBe('GitHub du projet')
    expect(githubLink.attributes('title')).toBe('GitHub du projet')
  })

  test('contient une icône GitHub avec les bonnes classes', () => {
    const wrapper = mount(Footer)
    const icon = wrapper.find('span[class="iconify i-uil:github text-gray-500 !w-6 !h-6 hover:text-gray-700 transition-colors"]')
    
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('text-gray-500')
    expect(icon.classes()).toContain('!w-6')
    expect(icon.classes()).toContain('!h-6')
    expect(icon.classes()).toContain('hover:text-gray-700')
    expect(icon.classes()).toContain('transition-colors')
  })

  test('applique les classes CSS correctement au footer', () => {
    const wrapper = mount(Footer)
    const footer = wrapper.find('footer')
    
    expect(footer.classes()).toContain('bg-white/90')
    expect(footer.classes()).toContain('backdrop-blur-sm')
    expect(footer.classes()).toContain('shadow-sm')
    expect(footer.classes()).toContain('mt-8')
  })

  test('a une structure de mise en page correcte', () => {
    const wrapper = mount(Footer)
    const container = wrapper.find('.container')
    const content = container.find('.max-w-7xl')
    
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('mx-auto')
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('justify-between')
    expect(container.classes()).toContain('items-center')
    
    expect(content.exists()).toBe(true)
    expect(content.classes()).toContain('py-4')
    expect(content.classes()).toContain('px-4')
    expect(content.classes()).toContain('sm:px-6')
    expect(content.classes()).toContain('lg:px-8')
  })

  test('contient un élément vide avec aria-hidden pour l\'alignement', () => {
    const wrapper = mount(Footer)
    const container = wrapper.find('.container')
    const hiddenElement = container.find('div[aria-hidden="true"]')
    
    expect(hiddenElement.exists()).toBe(true)
    expect(hiddenElement.attributes('aria-hidden')).toBe('true')
    expect(hiddenElement.html()).toBe('<div aria-hidden="true"></div>')
  })
}) 
