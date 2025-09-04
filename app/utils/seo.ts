/**
 * Compose a SEO title with the site name, ensuring it doesn't exceed 60 characters
 * @param title - The title to compose with the site name
 * @returns The composed title with maximum 60 characters
 */
export function composeSeoTitle(title: string): string {
  const siteName = ' Kaamelott GIFs'
  const maxTitleLength = 60 - siteName.length

  if (!title) {
    return siteName.trim()
  }

  if (title.length > maxTitleLength) {
    return `${title.slice(0, maxTitleLength)}...${siteName}`
  }

  return `${title}${siteName}`
}

/**
 * Compose a SEO description with the site name, ensuring it doesn't exceed 155 characters
 * @param description - The description to compose with the site name
 * @returns The composed description with maximum 155 characters
 */
export function composeSeoDescription(description: string): string {
  const maxDescriptionLength = 155

  if (!description) {
    return 'Kaamelott GIFs'
  }

  if (description.length > maxDescriptionLength) {
    return `${description.slice(0, maxDescriptionLength)}...`
  }

  return description
}
