import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

/**
 * AWS S3 client
 */
export const awsClient = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-3',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
  },
})

/**
 * Upload a gif to S3
 * @param file - The file to upload
 * @returns The result of the upload
 */
export async function uploadGifToS3(file: any) {
  try {
    if (!process.env.AWS_BUCKET_NAME) {
      throw new Error('AWS_BUCKET_NAME is not set')
    }
  
    if (!file) {
      throw new Error('File name is not set')
    }
  
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: 'gifs',
      ContentType: file.type,
      Body: file.data, 
    }
  
    const command = new PutObjectCommand(params)
    return awsClient.send(command)
  } catch (error) {
    console.error(error)
    throw error
  }
}

