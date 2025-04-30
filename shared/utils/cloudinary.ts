import type { Gif } from "~/types"
import { v2 as cloudinary   } from 'cloudinary'

/**
 * Upload a gif to Cloudinary
 * @param gif - The gif to upload
 * @param filePath - The path to the gif file
 * @returns The uploaded gif
 */
export const uploadGifToCloudinary = async (gif: Omit<Gif, 'filePath' | 'url' | 'public_id'>, filePath: string) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  if (!cloudinary) {
    throw new Error('Cloudinary is not configured')
  }
  // const filePath = path.join(process.cwd(), 'public', 'gifs', `${gif.filename}`)

  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: 'auto',
    folder: 'kaamelott-gifs',
    public_id: gif.slug,
    overwrite: false,
    transformation: [
      { quality: 'auto' },
      { fetch_format: 'auto' },
      { dpr: 'auto' },
      { width: 'auto' },
      { crop: 'scale' },
      { flags: 'lossy' }
    ]
  })

  if ('filePath' in gif) {
    delete gif.filePath
  }

  return {
    ...gif,
    url: result.secure_url,
    public_id: result.public_id
  }
}

/**
 * Get the optimized image url
 * @param url - The url of the image
 * @returns The optimized image url
 */
export function getOptimizedImageUrl(url: string) {
  if (!url) {
    return null
  }
  // Remove the version number and file extension
  const urlWithoutVersion = url.replace(/\/v\d+\//, '/v1/')
  const urlWithoutExtension = urlWithoutVersion.replace(/\.(gif|jpg|jpeg|png)$/, '')
  // Add optimization parameters
  return urlWithoutExtension.replace('upload', 'upload/f_auto,q_auto')
}
