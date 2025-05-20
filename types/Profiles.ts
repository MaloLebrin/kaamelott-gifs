export interface Profile {
  id: string
  userId: string
  role: ProfileRole
  createdAt: string
}

export enum ProfileRole {
  ADMIN = 'admin',
  USER = 'user',
}
