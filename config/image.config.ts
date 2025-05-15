export const imageConfig = {
  domains: [
    // 'localhost',
    'kaamelottgifs.fr',
    // 's3.eu-west-3.amazonaws.com',
    'https://kv1gbucket.s3.eu-west-3.amazonaws.com',
  ],
  dir: 'public',
}

/**
 * @description Icon configuration
 * @returns {Object} Icon configuration
 */
export const iconConfig = {
  customCollections: [
    {
      prefix: 'custom',
      dir: './assets/icons',
    },
  ],
}
