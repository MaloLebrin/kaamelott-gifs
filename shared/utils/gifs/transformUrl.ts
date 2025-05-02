export function transformUrl({

  fileName,
}: {

  fileName: string
}) {
  if (!fileName) {
    return null
  }

  // Return the S3 URL with the same filename
  return `https://kv1gbucket.s3.eu-west-3.amazonaws.com/gifs/${fileName}`
}
