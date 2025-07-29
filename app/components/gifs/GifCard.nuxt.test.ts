import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import type { Gif } from '~~/shared/types'
import GifCard from '../../../components/gifs/GifCard.vue'

describe('GifCard', () => {
  const mockGif: Gif = {
    id: 1,
    slug: 'test-gif',
    url: 'test.gif',
    quote: 'Test quote',
    characters: ['Character 1', 'Character 2'],
    filename: 'test.gif',
    public_id: 'test',
    episode: null,
    createdAt: new Date().toISOString()
  }

  test('renders with correct props', () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    expect(wrapper.find('article').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('Character 1')
  })

  test('emits click event when clicked', async () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([mockGif])
  })

  test('renders all character tags', () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    const tags = wrapper.findAllComponents({ name: 'BaseTag' })
    expect(tags).toHaveLength(2)
    expect(tags[0].props('label')).toBe('Character 1')
    expect(tags[1].props('label')).toBe('Character 2')
  })

  test('applies correct classes', () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    expect(wrapper.find('article').classes()).toContain('rounded-[32px]')
    expect(wrapper.find('article').classes()).toContain('cursor-pointer')
  })

  test('renders AppImage with correct props', () => {
    const wrapper = mount(GifCard, {
      props: {
        gif: mockGif
      }
    })

    const appImage = wrapper.findComponent({ name: 'AppImage' })
    expect(appImage.exists()).toBe(true)
    expect(appImage.props('src')).toBe(mockGif.url)
    expect(appImage.props('alt')).toBe(mockGif.quote)
  })
}) 
