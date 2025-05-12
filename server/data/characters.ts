import { formatCharactersToBack } from "~/shared/utils/gifs/formatCharacters"
import { newSlugify, slugify } from "~/shared/utils/string"
import type { Character, CharacterInput } from "~/types/Characters"
import type { Episode } from "~/types/Episode"

export const characters = [
  {
    "actor": "Vanessa Guedj",
    "name": "Guenièvre",
    "isMainCharacter": true
  },
  {
    "actor": "Anouk Grinberg",
    "name": "Anna",
    "isMainCharacter": false
  },
  {
    "actor": "Emmanuel Meirieu",
    "name": "Appius Manilius",
    "isMainCharacter": false
  },
  {
    "actor": "Alexandre Astier",
    "name": "Arthur",
    "isMainCharacter": true
  },
  {
    "actor": "Lan Truong",
    "name": "Attila",
    "isMainCharacter": false
  },
  {
    "actor": "François Morel",
    "name": "Belt",
    "isMainCharacter": false
  },
  {
    "actor": "Jean-Robert Lombard",
    "name": "Père Blaise",
    "isMainCharacter": true
  },
  {
    "actor": "Nicolas Gabion",
    "name": "Bohort",
    "isMainCharacter": true
  },
  {
    "actor": "Yvan le Bolloc'h",
    "name": "Breccan",
    "isMainCharacter": false
  },
  {
    "actor": "Guillaume Briat",
    "name": "Le Roi Burgonde",
    "isMainCharacter": false
  },
  {
    "actor": "Bruno Salomone",
    "name": "Caius Camillus",
    "isMainCharacter": false
  },
  {
    "actor": "Stéphane Margot",
    "name": "Calogrenant",
    "isMainCharacter": false
  },
  {
    "actor": "François Levantal",
    "name": "Capito",
    "isMainCharacter": false
  },
  {
    "actor": "Pierre Mondy",
    "name": "César",
    "isMainCharacter": false
  },
  {
    "actor": "Claire Nadeau",
    "name": "Cryda de Tintagel",
    "isMainCharacter": false
  },
  {
    "actor": "Antoine de Caunes",
    "name": "Dagonet",
    "isMainCharacter": false
  },
  {
    "actor": "Audrey Fleurot",
    "name": "La Dame du Lac",
    "isMainCharacter": true
  },
  {
    "actor": "Caroline Pascal",
    "name": "Demetra",
    "isMainCharacter": false
  },
  {
    "actor": "Anne Benoît",
    "name": "Drusilla",
    "isMainCharacter": false
  },
  {
    "actor": "Alain Chabat",
    "name": "Le Duc d'Aquitaine",
    "isMainCharacter": true
  },
  {
    "actor": "\u00c9milie Dequenne",
    "name": "Edern",
    "isMainCharacter": false
  },
  {
    "actor": "Bruno Fontaine",
    "name": "Elias de Kelliwic'h",
    "isMainCharacter": false
  },
  {
    "actor": "Alexis Hénon",
    "name": "Galessin",
    "isMainCharacter": false
  },
  {
    "actor": "Aurélien Portehaut",
    "name": "Gauvain",
    "isMainCharacter": false
  },
  {
    "actor": "Philippe Nahon",
    "name": "Goustan",
    "isMainCharacter": false
  },
  {
    "actor": "Thibault Roux",
    "name": "Grüdü",
    "isMainCharacter": false
  },
  {
    "actor": "Serge Papagalli",
    "name": "Guethenoc",
    "isMainCharacter": true
  },
  {
    "actor": "Tony Saba",
    "name": "Hervé de Rinel",
    "isMainCharacter": false
  },
  {
    "actor": "Loránt Deutsch",
    "name": "L'interprète burgonde",
    "isMainCharacter": false
  },
  {
    "actor": "Georges Beller",
    "name": "Le Seigneur Jacca",
    "isMainCharacter": false
  },
  {
    "actor": "Alexandra Saadoun et Magali Saadoun",
    "name": "Les Jumelles du pêcheur",
    "isMainCharacter": false
  },
  {
    "actor": "Christian Clavier",
    "name": "Le Jurisconsulte",
    "isMainCharacter": false
  },
  {
    "actor": "Brice Fournier",
    "name": "Kadoc",
    "isMainCharacter": false
  },
  {
    "actor": "Jean-Christophe Hembert",
    "name": "Karadoc",
    "isMainCharacter": true
  },
  {
    "actor": "Thomas Cousseau",
    "name": "Lancelot",
    "isMainCharacter": true
  },
  {
    "actor": "Lionnel Astier",
    "name": "Léodagan",
    "isMainCharacter": true
  },
  {
    "actor": "François Rollin",
    "name": "Loth",
    "isMainCharacter": true
  },
  {
    "actor": "Christian Bujeau",
    "name": "Le Maître d'Armes",
    "isMainCharacter": false
  },
  {
    "actor": "Carlo Brandt",
    "name": "Méléagant",
    "isMainCharacter": false
  },
  {
    "actor": "Tcheky Karyo",
    "name": "Manius Macrinus Firmus",
    "isMainCharacter": false
  },
  {
    "actor": "Jacques Chambon",
    "name": "Merlin",
    "isMainCharacter": true
  },
  {
    "actor": "Caroline Ferrus",
    "name": "Mevanwi",
    "isMainCharacter": false
  },
  {
    "actor": "Franck Pitiot",
    "name": "Perceval",
    "isMainCharacter": true
  },
  {
    "actor": "Gilles Graveleau",
    "name": "Roparzh",
    "isMainCharacter": false
  },
  {
    "actor": "Patrick Chesnais",
    "name": "Lucius Sillius Sallustius",
    "isMainCharacter": false
  },
  {
    "actor": "Axelle Laffont",
    "name": "Séfriane d'Aquitaine",
    "isMainCharacter": false
  },
  {
    "actor": "Joëlle Sevilla",
    "name": "Séli",
    "isMainCharacter": true
  },
  {
    "actor": "Pascal Demolon",
    "name": "Spurius Cordius Frontinius",
    "isMainCharacter": false
  },
  {
    "actor": "Alain Chapuis",
    "name": "Le Tavernier",
    "isMainCharacter": false
  },
  {
    "actor": "Pascal Vincent",
    "name": "Urgan",
    "isMainCharacter": false
  },
  {
    "actor": "Manu Payet",
    "name": "Vérinus",
    "isMainCharacter": false
  },
  {
    "actor": "Loïc Varraut",
    "name": "Venec",
    "isMainCharacter": false
  },
  {
    "actor": "Josée Drevon",
    "name": "Ygerne",
    "isMainCharacter": false
  },
  {
    "actor": "Simon Astier",
    "name": "Yvain",
    "isMainCharacter": true
  }
]

/**
 * Compose a character from a character object
 * @param character - The character object
 * @returns The composed character
 */
export function composeCharacter({
  actor,
  name,
  isMainCharacter,
  episodes,
  description,
  history,
}: {
  actor: string
  name: string
  isMainCharacter: boolean
  episodes: Episode[]
  description?: string
  history?: string
}): CharacterInput {
  const episodesCodes = episodes ? formatCharactersToBack(episodes.map(episode => episode.code)) : ''

  return {
    actor: actor || null,
    name,
    isMainCharacter: isMainCharacter || false,
    slug: newSlugify(name),
    episodesCodes,
    imgUrl: `/characters/${slugify(name)}.jpg`,
    description: description || null,
    history: history || null,
  }
}
