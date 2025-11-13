import { describe, expect, test } from 'vitest'
import type { Episode } from '~~/shared/types/Episode'
import { charactersData, composeCharacter, sndMovieCharacters } from './characters'

describe('characters.ts', () => {
  describe('charactersData', () => {
    test('contient les personnages principaux de la série', () => {
      const mainCharacters = charactersData.filter(char => char.isMainCharacter)
      const expectedMainCharacters = ['Arthur', 'Guenièvre', 'Père Blaise', 'Bohort', 'Karadoc', 'Perceval', 'Léodagan', 'Merlin', 'Lancelot', 'Séli', 'Yvain', 'Guethenoc', 'La Dame du Lac']
      
      expectedMainCharacters.forEach(characterName => {
        expect(mainCharacters.some(char => char.name === characterName)).toBe(true)
      })
    })

    test('tous les personnages ont les propriétés requises', () => {
      charactersData.forEach(character => {
        expect(character).toHaveProperty('actor')
        expect(character).toHaveProperty('name')
        expect(character).toHaveProperty('isMainCharacter')
        expect(typeof character.actor).toBe('string')
        expect(typeof character.name).toBe('string')
        expect(typeof character.isMainCharacter).toBe('boolean')
      })
    })
  })

  describe('sndMovieCharacters', () => {
    test('contient les personnages du deuxième film', () => {
      expect(sndMovieCharacters).toHaveLength(49)
    })

    test('contient les personnages principaux du deuxième film', () => {
      const mainCharacters = sndMovieCharacters.filter(char => char.isMainCharacter)
      const expectedMainCharacters = [
        'Bohort de Gaunes',
        'La Dame du Lac', 
        'Guethenoc',
        'Karadoc de Vannes',
        'Lancelot du Lac',
        'Léodagan de Carmélide',
        'Merlin l\'Enchanteur',
        'Séli'
      ]
      
      expectedMainCharacters.forEach(characterName => {
        expect(mainCharacters.some(char => char.name === characterName)).toBe(true)
      })
    })

    test('tous les personnages du deuxième film ont les propriétés requises', () => {
      sndMovieCharacters.forEach(character => {
        expect(character).toHaveProperty('actor')
        expect(character).toHaveProperty('name')
        expect(character).toHaveProperty('isMainCharacter')
        expect(typeof character.actor).toBe('string')
        expect(typeof character.name).toBe('string')
        expect(typeof character.isMainCharacter).toBe('boolean')
      })
    })

    test('contient des personnages spécifiques au deuxième film', () => {
      const specificCharacters = ['Aziliz', 'Brise-Bûche', 'Casparzh', 'Déneig', 'Ffraid', 'Géran', 'Iagu', 'La Pègue', 'Petrok', 'Silas', 'Trévor', 'Tumet', 'Vareznota']
      
      specificCharacters.forEach(characterName => {
        expect(sndMovieCharacters.some(char => char.name === characterName)).toBe(true)
      })
    })
  })

  describe('composeCharacter', () => {
    test('compose correctement un personnage avec les propriétés de base', () => {
      const mockEpisodes: Episode[] = [
        { code: 'S01E01', title: 'Épisode test', season: 1, episode: 1 } as Episode
      ]

      const character = composeCharacter({
        actor: 'Alexandre Astier',
        name: 'Arthur',
        isMainCharacter: true,
        episodes: mockEpisodes,
        description: 'Roi de Bretagne',
        history: 'Histoire du personnage'
      })

      expect(character).toEqual({
        actor: 'Alexandre Astier',
        name: 'Arthur',
        isMainCharacter: true,
        slug: 'arthur',
        episodeCodes: 'S01E01',
        imgUrl: '/characters/arthur.jpg',
        description: 'Roi de Bretagne',
        history: 'Histoire du personnage'
      })
    })

    test('compose correctement un personnage sans description ni historique', () => {
      const character = composeCharacter({
        actor: 'Test Actor',
        name: 'Test Character',
        isMainCharacter: false,
        episodes: []
      })

      expect(character).toEqual({
        actor: 'Test Actor',
        name: 'Test Character',
        isMainCharacter: false,
        slug: 'test-character',
        episodeCodes: '',
        imgUrl: '/characters/test-character.jpg',
        description: null,
        history: null
      })
    })

    test('gère correctement les noms avec caractères spéciaux', () => {
      const character = composeCharacter({
        actor: 'Test Actor',
        name: 'Ciar d\'Orcanie',
        isMainCharacter: false,
        episodes: []
      })

      expect(character.slug).toBe('ciar-d-orcanie')
      expect(character.imgUrl).toBe('/characters/ciar-d-orcanie.jpg')
    })
  })
})
