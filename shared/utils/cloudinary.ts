import type { Gif } from "~/types"
import cloudinary from 'cloudinary'

// /**
//  * Cloudinary client
//  * @returns The cloudinary client
//  */
// export const imageClient = 

// const result = await cloudinary.v2.uploader.upload(file.path, {
//   folder: `beright-${NODE_ENV}/company-${company.id}/user-${user.id}-${user.firstName}-${user.lastName}/${FileTypeEnum.PROFILE_PICTURE}`,
//   quality: 'auto',
//   fetch_format: 'auto',
//   format: 'webp',
// })

/**
 * Upload a gif to Cloudinary
 * @param gif - The gif to upload
 * @param filePath - The path to the gif file
 * @returns The uploaded gif
 */
export const uploadGifToCloudinary = async (gif: Omit<Gif, 'filePath' | 'url' | 'public_id'>, filePath: string) => {

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  if (!cloudinary.v2) {
    throw new Error('Cloudinary is not configured')
  }
  // const filePath = path.join(process.cwd(), 'public', 'gifs', `${gif.filename}`)

  const result = await cloudinary.v2.uploader.upload(filePath, {
    resource_type: 'auto',
    folder: 'kaamelott-gifs',
    public_id: gif.slug,
    overwrite: false,
    transformation: [
      { quality: 'auto' },
      { fetch_format: 'auto' }
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
