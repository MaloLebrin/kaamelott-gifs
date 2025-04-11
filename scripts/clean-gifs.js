import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { readdir } from 'node:fs/promises'

async function cleanGifs() {
  try {
    // Lire le fichier gifs.json
    const gifsPath = join(process.cwd(), 'content', 'gifs.json')
    const gifsData = await readFile(gifsPath, 'utf-8')
    const gifs = JSON.parse(gifsData)

    // Lire la liste des fichiers dans le dossier public/gifs
    const gifsDir = join(process.cwd(), 'public', 'gifs')
    const gifFiles = await readdir(gifsDir)

    // Créer un Set des noms de fichiers GIF (sans l'extension)
    const gifFilenames = new Set(gifFiles.map(file => file.replace('.gif', '')))

    // Filtrer les entrées qui ont un GIF correspondant
    const cleanedGifs = gifs.filter(gif => gifFilenames.has(gif.filename.replace('.gif', '')))

    // Écrire le fichier nettoyé
    await writeFile(gifsPath, JSON.stringify(cleanedGifs, null, 2))

    console.log(`Nettoyage terminé : ${gifs.length - cleanedGifs.length} entrées supprimées`)
    console.log(`Il reste ${cleanedGifs.length} entrées valides`)
  } catch (error) {
    console.error('Erreur lors du nettoyage :', error)
  }
}

cleanGifs() 
