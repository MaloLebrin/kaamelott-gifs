import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

/**
 * AWS S3 client
 */
export const awsClient = new S3Client({
  region: 'eu-west-3',
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_S3_SECRET_KEY || '',
  },
})

/**
 * Upload a gif to S3
 * @param file - The file to upload
 * @returns The result of the upload
 */
export async function uploadGifToS3(file: any, fileName: string) {
  try {
    if (!process.env.AWS_S3_BUCKET_NAME) {
      throw new Error('AWS_S3_BUCKET_NAME is not set')
    }
  
    if (!file) {
      throw new Error('File name is not set')
    }
  
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '',
      Key: `gifs/${fileName}`,
      ContentType: file.type,
      Body: file.data, 
    }
  
    const command = new PutObjectCommand(params)
    return awsClient.send(command)
  } catch (error) {
    console.error(error, 'error uploadGifToS3')
    throw error
  }
}

