import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GifCard from './GifCard.vue'
import type { Gif } from '~/types'

const mockGif: Gif = {
  id: 1,
  createdAt: '2024-01-01T00:00:00.000Z',
  filename: 'test-gif.gif',
  url: 'https://example.com/test-gif.gif',
  quote: 'Test quote',
  characters: ['Character 1', 'Character 2', 'Character 3'],
  characters_speaking: ['Character 1', 'Character 2'],
  slug: 'test-gif',
  public_id: 'test-gif',
  episode: '1-1'
}

describe('GifCard', () => {
  test('renders correctly with gif data', () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    expect(wrapper.find('article').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe(mockGif.characters[0])
  })

  test('displays all characters except the first one in the hover state', () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    const characterTags = wrapper.findAll('.bg-gray-100')
    expect(characterTags.length).toBe(mockGif.characters.length - 1)
    expect(characterTags[0].text()).toBe(mockGif.characters[1])
    expect(characterTags[1].text()).toBe(mockGif.characters[2])
  })

  test('emits click event with gif data when clicked', async () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    await wrapper.find('article').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([mockGif])
  })

  test('has correct aspect ratio', () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    const aspectRatioDiv = wrapper.find('.aspect-video')
    expect(aspectRatioDiv.exists()).toBe(true)
  })

  test('has correct posthog capture attribute', () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    const article = wrapper.find('article')
    expect(article.attributes('v-posthog-capture')).toBe(`click_gif_${mockGif.filename}`)
  })
}) 
