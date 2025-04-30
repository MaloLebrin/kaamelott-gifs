import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CharacterGrid from './CharacterGrid.vue'
import CharacterListItem from './CharacterListItem.vue'

interface Character {
  name: string
  avatar: string
  nbGifs?: number
}

describe('CharacterGrid', () => {
  const mockCharacters: Character[] = [
    {
      name: 'Arthur',
      avatar: '/characters/arthur.jpg',
      nbGifs: 10
    },
    {
      name: 'Perceval',
      avatar: '/characters/perceval.jpg',
      nbGifs: 5
    },
    {
      name: 'Karadoc',
      avatar: '/characters/karadoc.jpg'
    }
  ]

  test('renders all characters', () => {
    const wrapper = mount(CharacterGrid, {
      props: {
        characters: mockCharacters
      }
    })

    const characterItems = wrapper.findAllComponents(CharacterListItem)
    expect(characterItems).toHaveLength(3)
  })

  test('passes correct props to each CharacterListItem', () => {
    const wrapper = mount(CharacterGrid, {
      props: {
        characters: mockCharacters
      }
    })

    const characterItems = wrapper.findAllComponents(CharacterListItem)
    
    characterItems.forEach((item, index) => {
      expect(item.props('character')).toEqual(mockCharacters[index])
    })
  })

  test('renders with empty characters array', () => {
    const wrapper = mount(CharacterGrid, {
      props: {
        characters: []
      }
    })

    const characterItems = wrapper.findAllComponents(CharacterListItem)
    expect(characterItems).toHaveLength(0)
  })

  test('renders with default props', () => {
    const wrapper = mount(CharacterGrid)

    const characterItems = wrapper.findAllComponents(CharacterListItem)
    expect(characterItems).toHaveLength(0)
  })

  test('has correct grid classes', () => {
    const wrapper = mount(CharacterGrid, {
      props: {
        characters: mockCharacters
      }
    })

    const grid = wrapper.find('div')
    expect(grid.classes()).toContain('grid')
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-2')
    expect(grid.classes()).toContain('lg:grid-cols-3')
    expect(grid.classes()).toContain('gap-6')
  })

  test('renders characters with optional nbGifs', () => {
    const wrapper = mount(CharacterGrid, {
      props: {
        characters: mockCharacters
      }
    })

    const characterItems = wrapper.findAllComponents(CharacterListItem)
    expect(characterItems[0].props('character').nbGifs).toBe(10)
    expect(characterItems[1].props('character').nbGifs).toBe(5)
    expect(characterItems[2].props('character').nbGifs).toBeUndefined()
  })
})
